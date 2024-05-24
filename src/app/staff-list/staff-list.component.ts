import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { ShowToastService } from '../shared/services/show-toast.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FilterCriteria,
  Staff,
  StaffFilter,
  staffFilterOption,
} from '../shared/interfaces/staffFilter.interface';
import { StaffModuleService } from '../shared/services/staff-module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  stafList: Staff[] = [];
  filterStafList: Staff[] = [];
  loadingArr: string[] = [];
  localStorageData: any;

  filterList: StaffFilter[] = [];
  staffListLoader: boolean = false;

  filterForm!: FormGroup;
  formControlList: string[] = [];
  showFilter: boolean = true;
  selectedStaff: { data: Staff | null; show: boolean } = {
    data: null,
    show: false,
  };

  selectedStaffList: Staff[] = [];
  constructor(
    private sharedS: SharedService,
    private showToastS: ShowToastService,
    private staffS: StaffModuleService,
    private router: Router
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
    this.loadingArr = [];
    this.loadingArr = Array.from({ length: 12 }).map((_, i) => `Item #${i}`);
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

  filterStaffList(staffList: Staff[], criteria: FilterCriteria): Staff[] {
    return staffList.filter((staff: Staff) => {
      return Object.entries(criteria).every(([filterName, filterOption]) => {
        const driverFilter = staff.filters.find(
          (f: StaffFilter) => f.filter_name === filterName
        );
        return (
          driverFilter &&
          driverFilter.options.some(
            (option: staffFilterOption) =>
              option.option_id === filterOption.option_id
          )
        );
      });
    });
  }

  resetFilter() {
    this.filterStafList = this.stafList;
    this.filterForm.reset();
  }

  addStaffList(data: Staff) {
    this.staffS.setSelectedStaff(data);
    this.staffS.updateStaffList(this.filterStafList);
    this.router.navigateByUrl('/staffList/viewStaff');
  }

  hideShowStaffDetail(data: Staff | null, show: boolean) {
    if (data && this.checkSelectedSaff(data)) {
      this.selectedStaffList.map((list: Staff, index: number) => {
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

  closrTrigerFromChild(event: { isSelected: boolean; data: Staff }) {
    if (event && event.isSelected && event.data) {
      this.selectedStaffList.push(event.data);
    } else {
      // this.selectedStaffList = [];
    }
    this.hideShowStaffDetail(null, false);
  }

  upadteTrigerFromChild(event: { data: Staff[] }) {
    if (event && event.data) {
      this.selectedStaffList = event.data;
    }
  }

  checkSelectedSaff(staff: Staff) {
    let ret = false;
    this.selectedStaffList.map((list: Staff) => {
      if (list?.id == staff.id) {
        ret = true;
      }
    });

    return ret;
  }
}
