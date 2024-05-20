import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { loginApi } from 'src/app/shared/interfaces/loginApi.interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ShowToastService } from 'src/app/shared/services/show-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  localStorageData: any;
  formStep: number = 1;
  loginFormSubmit: boolean = false;
  loginLoader: boolean = false;
  loginForm!: FormGroup;
  businessID: string = '';
  numList: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  constructor(
    private sharedS: SharedService,
    private showToastS: ShowToastService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      businessId: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getLocalStorageData();
  }

  getLocalStorageData() {
    this.sharedS
      .getData()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.localStorageData = data;
        let user = this.localStorageData?.user;

        // redirect user if user id exist in localStorage Data
        if (user && user.id && user.id.length > 0) {
          this.router.navigateByUrl('/staffList');
        }
      });
  }

  goBack() {
    if (this.formStep > 1) {
      this.formStep -= 1;
    }
  }

  enterVal(number: string): void {
    let controlName = this.getCurrentContoler();
    if (controlName) {
      let inputVal = this.loginForm.controls[controlName].value;
      if (inputVal) {
        inputVal += number;
      } else {
        inputVal = number;
      }
      this.loginForm.controls[controlName].setValue(inputVal);
    }
  }

  remove(): void {
    let controlName = this.getCurrentContoler();
    if (controlName) {
      let inputVal = this.loginForm.controls[controlName].value;
      if (inputVal) {
        let val = inputVal.length - 1;
        inputVal = inputVal.slice(0, val);
      } else {
        inputVal = '';
      }
      this.loginForm.controls[controlName].setValue(inputVal);
    }
  }

  onSubmit(data: FormGroup): void {
    let controlName = this.getCurrentContoler();
    if (controlName) {
      this.loginFormSubmit = true;
      let isValid = this.loginForm.controls[controlName].valid;
      if (isValid && this.formStep != 4) {
        this.formStep += 1;
        this.loginFormSubmit = false;
      }
    }
    if (data.valid) {
      let formVal = data.value;
      if (this.formStep === 4) {
        let apiParam: loginApi = {
          business_id: formVal.businessId ? formVal.businessId : '',
          username: formVal.userName ? formVal.userName : '',
          password: formVal.password ? formVal.password : '',
          business_type: 'restaurant',
          useLocalID: false,
        };
        this.callLoginApi(apiParam);
      }
    }
  }

  getCurrentContoler(): string | null {
    let controlName = null;
    switch (this.formStep) {
      case 1:
        controlName = 'businessId';
        break;
      case 2:
        controlName = 'userName';
        break;
      case 3:
        controlName = 'password';
        break;
    }
    return controlName;
  }

  callLoginApi(apiParam: loginApi): void {
    this.loginLoader = true;
    this.sharedS
      .sendPostRequest('Business_controller/app_login', apiParam)
      .subscribe({
        next: (res: any) => {
          this.loginLoader = false;
          if (res.status && (res.status == 'true' || res.status == true)) {
            this.sharedS.insertData({ key: 'user', val: res });
            this.router.navigateByUrl('/staffList');
          } else {
            this.showToastS.setToast({
              show: true,
              message: res.message,
            });
          }
        },
        error: (err: any) => {
          this.loginLoader = false;
          this.showToastS.setToast({
            show: true,
            message: err.error.message ? err.error.message : 'Server Error',
          });
        },
      });
  }
}
