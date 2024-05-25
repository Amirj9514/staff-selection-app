import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, take } from 'rxjs';
import { Staff } from 'src/app/shared/interfaces/staffFilter.interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StaffModuleService } from 'src/app/shared/services/staff-module.service';

@Component({
  selector: 'app-view-staff-detail',
  templateUrl: './view-staff-detail.component.html',
  styleUrls: ['./view-staff-detail.component.scss'],
})
export class ViewStaffDetailComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter<{
    isSelected: boolean;
    data: any;
  }>();

  @Output() updateStaffList = new EventEmitter<{ data: any }>();

  localStorageData: any;
  selectedStaff: Staff | null = null;
  allStaffList: Staff[] = [];
  selectedStaffList: Staff[] = [];
  activeStaff: { index: number; staff: any } = {
    index: NaN,
    staff: null,
  };

  visible: boolean = false;
  showFloorPlan: boolean = false;
  floorPlan: any[] = [];
  selectedFloor: any;

  constructor(
    private sharedS: SharedService,
    private staffS: StaffModuleService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getLocalStorageData();
    this.getSelectedStaff();
    this.getSelectedStaffList();
    this.getAllStaffList();
  }
  getLocalStorageData() {
    this.sharedS
      .getData()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.localStorageData = data;
      });
  }
  getSelectedStaff() {
    this.staffS
      .getSelectedStaff()
      .pipe(take(1))
      .subscribe((staff: Staff | null) => {
        if (staff) {
          this.selectedStaff = staff;
        } else {
          this.redirect('/staffList');
        }
      });
  }

  getSelectedStaffList() {
    this.staffS
      .getSelectStaffList()
      .pipe(take(1))
      .subscribe((list: Staff[]) => {
        console.log(list);

        this.selectedStaffList = list;
      });
  }

  getAllStaffList() {
    this.staffS
      .getAllStaff()
      .pipe(take(1))
      .subscribe((staff: Staff[]) => {
        this.allStaffList = staff;
        this.allStaffList.map((staff: any, index: number) => {
          if (this.selectedStaff && staff.id == this.selectedStaff.id) {
            this.activeStaff = { index, staff };
          }
        });
      });
  }

  withoutRoom() {
    this.redirect('staffList/customer');
    // this.staffS.setSelectedStaff(null);
    // this.staffS.updateSelectedStaffList([]);
    // this.staffS.updateStaffList([]);
    // this.redirect('/home');
  }

  addStaff() {
    let isExist: boolean = false;
    this.selectedStaffList.map((staff: any, index: number) => {
      if (staff.id == this.activeStaff.staff.id) {
        this.selectedStaffList.splice(index, 1);
        this.staffS.updateSelectedStaffList(this.selectedStaffList);
        isExist = true;
      }
    });

    if (!isExist) {
      this.selectedStaffList.push(this.activeStaff.staff);
      this.staffS.updateSelectedStaffList(this.selectedStaffList);
    }
  }

  getRooms() {
    this.redirect('/staffList/table');
  }

  AddMoreStaff() {
    this.redirect('/staffList');
  }

  isSelected() {
    let ret = false;
    for (let i = 0; i < this.selectedStaffList.length; i++) {
      const element = this.selectedStaffList[i];

      if (this.activeStaff.staff.id == element.id) {
        ret = true;
      }
    }
    return ret;
  }

  next(index: number) {
    let leng = this.allStaffList.length;
    if (leng > index + 1) {
      this.activeStaff = {
        index: index + 1,
        staff: this.allStaffList[index + 1],
      };
    }
  }

  prev(index: number) {
    if (index > 0) {
      this.activeStaff = {
        index: index - 1,
        staff: this.allStaffList[index - 1],
      };
    }
  }

  redirect(path: string) {
    this.router.navigateByUrl(path);
  }
}
