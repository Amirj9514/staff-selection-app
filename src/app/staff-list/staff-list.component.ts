import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { ShowToastService } from '../shared/services/show-toast.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FilterCriteria,
  StaffFilter,
} from '../shared/interfaces/staffFilter.interface';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  stafList: any[] = [];
  filterStafList: any[] = [];
  localStorageData: any;

  filterList: StaffFilter[] = [];
  staffListLoader: boolean = false;

  filterForm!: FormGroup;
  formControlList: string[] = [];
  showFilter: boolean = true;
  selectedStaff: { data: any; show: boolean } = {
    data: null,
    show: false,
  };

  selectedStaffList: any[] = [];
  constructor(
    private sharedS: SharedService,
    private showToastS: ShowToastService
  ) {
    this.filterForm = new FormGroup({});
  }

  ngOnInit() {
    this.getLocalStorageData();
    this.getStafList();
  }

  getLocalStorageData() {
    this.sharedS.getData().subscribe((data: any) => {
      this.localStorageData = data;
    });
  }
  getStafList() {
    let apiParam: { business_id: string } = {
      business_id: '76',
    };

    this.stafList = Array.from({ length: 12 }).map((_, i) => `Item #${i}`);
    this.filterStafList = this.stafList;
    this.staffListLoader = true;
    this.sharedS
      .sendPostRequest('Staff_selection/getStaffList', apiParam)
      .subscribe({
        next: (res: any) => {
          this.staffListLoader = false;
          if (res.status && (res.status == 'true' || res.status == true)) {
            this.stafList = res.staff;
            this.filterList = res.filters;
            this.filterStafList = this.stafList;
            if (this.filterList && this.filterList.length > 0) {
              this.genrateFilterDynamicForm(this.filterList);
            }
          } else {
            this.stafList = [];
            this.filterStafList = [];
            this.showToastS.setToast({
              show: true,
              message: res.message,
            });
          }
        },
        error: (err: any) => {
          this.stafList = [];
          this.filterStafList = [];
          this.staffListLoader = false;
          this.showToastS.setToast({
            show: true,
            message: err.error.message ? err.error.message : 'Server Error',
          });
        },
      });
  }

  genrateFilterDynamicForm(filter: StaffFilter[]) {
    filter.map((data: StaffFilter) => {
      if (data.filter_name && data.filter_name.length > 0) {
        this.formControlList.push(data.filter_name);
        this.filterForm.addControl(data.filter_name, new FormControl(null));
      }
    });
  }

  checkVal() {
    let ret = false;
    this.formControlList.map((control: string) => {
      let val = this.filterForm.controls[control].value;
      if (val) {
        ret = true;
      }
    });

    return ret;
  }

  checkImg(img: string) {
    if (img && img.length > 0) {
      return img;
    }
    return '../../assets/icon/imag.jpg';
  }

  ApplayFilter(data: FormGroup) {
    let formData = this.removeEmptyObject(data.value);
    this.filterStafList = this.filterStaffList(this.stafList, formData);
    console.log(this.filterStafList);
  }

  removeEmptyObject(obj: { [key: string]: any }) {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as { [key: string]: any });
  }

  filterStaffList(staffList: any[], criteria: FilterCriteria): StaffFilter[] {
    return staffList.filter((staff: any) => {
      return Object.entries(criteria).every(([filterName, filterOption]) => {
        const driverFilter = staff.filters.find(
          (f: any) => f.filter_name === filterName
        );
        return (
          driverFilter &&
          driverFilter.options.some(
            (option: any) => option.option_id === filterOption.option_id
          )
        );
      });
    });
  }

  resetFilter() {
    this.filterStafList = this.stafList;
    this.filterForm.reset();
  }

  hideShowStaffDetail(data: any, show: boolean) {
    if (data && this.checkSelectedSaff(data)) {
      this.selectedStaffList.map((list: any, index: number) => {
        console.log(list);
        if (list?.id == data.id) {
          this.selectedStaffList.splice(index, 1);
        }
      });
    } else {
      this.selectedStaff = {
        data,
        show,
      };
    }
  }

  closrTrigerFromChild(event: { isSelected: boolean; data: any }) {
    if (event && event.isSelected && event.data) {
      this.selectedStaffList.push(event.data);
    } else {
      this.selectedStaffList = [];
    }
    this.hideShowStaffDetail(null, false);
  }

  checkSelectedSaff(staff: any) {
    let ret = false;
    this.selectedStaffList.map((list: any) => {
      if (list?.id == staff.id) {
        ret = true;
      }
    });

    return ret;
  }
}
