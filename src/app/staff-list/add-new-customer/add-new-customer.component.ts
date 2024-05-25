import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, take } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss'],
})
export class AddNewCustomerComponent implements OnInit {
  customerSearchForm!: FormGroup;
  localStorageData: any;
  formSubmit: boolean = false;
  formSumitLoader: boolean = false;

  constructor(private sharedS: SharedService) {
    this.customerSearchForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phoneNum: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getLoacalStorageData();
  }

  getLoacalStorageData() {
    this.sharedS
      .getData()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.localStorageData = data;
      });
  }

  goBack() {}

  onSubmit(data: FormGroup) {
    this.formSubmit = true;
    if (data.valid) {
      let formVal = data.value;

      let apiParam = {
        business_id: this.localStorageData.user.id,
        firstname: formVal.firstName ? formVal.firstName : '',
        lastname: formVal.lastName ? formVal.lastName : '',
        email: formVal.email ? formVal.email : '',
        phone: formVal.phoneNum ? formVal.phoneNum : '',
      };
      this.formSumitLoader = true;
      this.sharedS.sendPostRequest('', apiParam).subscribe({
        next: (res: any) => {
          this.formSumitLoader = false;
          console.log(res);
        },
        error: (err: any) => {
          this.formSumitLoader = false;
        },
      });
    }
  }
}
