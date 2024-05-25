import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customerApi.interface';
import { Staff } from 'src/app/shared/interfaces/staffFilter.interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ShowToastService } from 'src/app/shared/services/show-toast.service';
import { StaffModuleService } from 'src/app/shared/services/staff-module.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customerSearchForm!: FormGroup;
  localStorageData: any;

  searchByList: { id: number; controlName: string; name: string }[] = [
    {
      id: 1,
      controlName: 'phoneNum',
      name: 'Phone Number',
    },
    {
      id: 2,
      controlName: 'email',
      name: 'Email',
    },
    {
      id: 3,
      controlName: 'name',
      name: 'Name',
    },
  ];

  formSumitLoader: boolean = false;
  formSubmit: boolean = false;
  customerList: Customer[] = [];
  selectedStaff: Staff | null = null;

  list: any[] = [1, 2, 3];
  constructor(
    private sharedS: SharedService,
    private showToastS: ShowToastService,
    private router: Router,
    private staffS: StaffModuleService
  ) {
    this.customerSearchForm = new FormGroup({
      searchBy: new FormControl({
        id: 1,
        controlName: 'phoneNum',
        name: 'Phone Number',
      }),
      email: new FormControl(null),
      name: new FormControl(null),
      phoneNum: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getLoacalStorageData();
    this.getSelectedStaff();
  }

  getSelectedStaff() {
    this.staffS
      .getSelectedStaff()
      .pipe(take(1))
      .subscribe((staff: Staff | null) => {
        if (staff) {
          this.selectedStaff = staff;
        } else {
          this.router.navigateByUrl('/staffList');
        }
      });
  }

  getLoacalStorageData() {
    this.sharedS
      .getData()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.localStorageData = data;
      });
  }

  inputType(data: FormGroup) {
    let val = data.value?.searchBy?.id;
    if (!val) {
      return 'number';
    }
    let ret = '';
    if (val == 2) {
      ret = 'email';
    } else if (val == 3) {
      ret = 'text';
    }
    return ret;
  }

  addRemoveVaidation(data: FormGroup) {
    let val = data.value?.searchBy;

    switch (val.controlName) {
      case 'phoneNum':
        this.customerSearchForm
          .get('email')
          ?.removeValidators([Validators.required, Validators.email]);
        this.customerSearchForm
          .get('name')
          ?.removeValidators([Validators.required]);
        this.customerSearchForm
          .get('phoneNum')
          ?.setValidators([Validators.required]);

        break;
      case 'email':
        this.customerSearchForm
          .get('phoneNum')
          ?.removeValidators([Validators.required]);
        this.customerSearchForm
          .get('name')
          ?.removeValidators([Validators.required]);
        this.customerSearchForm
          .get('email')
          ?.setValidators([Validators.required, Validators.email]);
        break;
      case 'name':
        this.customerSearchForm
          .get('email')
          ?.removeValidators([Validators.required, Validators.email]);
        this.customerSearchForm
          .get('phoneNum')
          ?.removeValidators([Validators.required]);

        this.customerSearchForm
          .get('name')
          ?.setValidators([Validators.required]);
        break;
    }

    this.customerSearchForm.get('phoneNum')?.updateValueAndValidity();
    this.customerSearchForm.get('name')?.updateValueAndValidity();
    this.customerSearchForm.get('email')?.updateValueAndValidity();
  }

  onSubmit(data: FormGroup) {
    console.log(data.valid);
    let val = data.value?.searchBy;

    if (val && val.name && data.valid) {
      let value = this.customerSearchForm.get(val.controlName)?.value;
      console.log(value, data.value);

      let apiParam = {
        business_id: this.localStorageData.businessData.id,
        name: '',
        email: '',
        phone: '',
        udid: '',
      };

      switch (val.controlName) {
        case 'phoneNum':
          apiParam.phone = value;
          break;

        case 'name':
          apiParam.name = value;
          break;
        case 'email':
          apiParam.email = value;
          break;

        default:
          break;
      }
      this.formSumitLoader = true;
      this.sharedS
        .sendPostRequest('customer_controller/get_search_customer', apiParam)
        .subscribe({
          next: (res: any) => {
            this.formSumitLoader = false;
            if (res.status == 'true' || res.status == true) {
              this.customerList =
                res.data && res.data.length > 0 ? res.data : [];
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

  reset() {
    let fromControlArr = ['phoneNum', 'email', 'name'];
    fromControlArr.map((control: string) => {
      this.customerSearchForm.get(control)?.reset();
    });
  }

  selectCustomer(data: Customer) {
    if (data) {
      this.sharedS.insertData({ key: 'user', val: data });
      this.goBack();
    }
  }

  goBack() {
    this.router.navigateByUrl('/staffList/viewStaff');
  }
}
