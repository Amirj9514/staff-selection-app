import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customerSearchForm!: FormGroup;
  localStorageData: any;
  searchByList: { id: number; name: string }[] = [
    {
      id: 1,
      name: 'Phone Number',
    },
    {
      id: 2,
      name: 'Email',
    },
    {
      id: 3,
      name: 'Name',
    },
  ];

  list:any[] = [1,2,3,4]
  constructor(private sharedS: SharedService) {
    this.customerSearchForm = new FormGroup({
      searchBy: new FormControl({ id: 1, name: 'Phone Number' }),
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
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

  goBack() {}
}
