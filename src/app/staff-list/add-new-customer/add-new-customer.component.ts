import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, take } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ShowToastService } from 'src/app/shared/services/show-toast.service';

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

  constructor(
    private sharedS: SharedService,
    private showToastS: ShowToastService
  ) {
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
        business_id: this.localStorageData.businessData.id,
        firstname: formVal.firstName ? formVal.firstName : '',
        lastname: formVal.lastName ? formVal.lastName : '',
        email: formVal.email ? formVal.email : '',
        phone: formVal.phoneNum ? formVal.phoneNum : '',
      };
      this.formSumitLoader = true;
      this.sharedS
        .sendPostRequest('customer_controller/signup_pos', apiParam)
        .subscribe({
          next: (res: any) => {
            this.formSumitLoader = false;
            if (res.status == 'true' || res.status == true) {
              this.sharedS.insertData({ key: 'user', val: res });
            } else {
              this.showToastS.setToast({
                show: true,
                message: res.message,
              });
            }
          },
          error: (err: any) => {
            this.formSumitLoader = false;
            this.showToastS.setToast({
              show: true,
              message: err.error.message ? err.error.message : 'Server Error',
            });
          },
        });
    }
  }
}
