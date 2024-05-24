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
        this.selectedStaff = staff;
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
    this.cancelEvent.emit({ isSelected: false, data: null });
    // this.selectedStaffList.push(this.selectedStaff);
    // console.log(this.selectedStaffList);
  }

  goBack(data?: { isSelected: boolean; data: any }) {
    if (data) {
      this.cancelEvent.emit(data);
    } else {
      this.cancelEvent.emit({ isSelected: false, data: null });
    }
  }

  addStaff() {
    let isExist: boolean = false;
    this.selectedStaffList.map((staff: any, index: number) => {
      if (staff.id == this.activeStaff.staff.id) {
        this.selectedStaffList.splice(index, 1);
        this.updateStaffList.emit({ data: this.selectedStaffList });
        isExist = true;
      }
    });

    if (!isExist) {
      this.selectedStaffList.push(this.activeStaff.staff);
      this.updateStaffList.emit({ data: this.selectedStaffList });
    }
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
  getRooms() {
    this.showFloorPlan = true;
    this.visible = false;
    this.sharedS
      .sendPostRequest('menu/get_business_rooms', { business_id: 76 })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.success) {
            this.floorPlan = res.rooms;
            if (this.floorPlan && this.floorPlan.length > 0) {
              this.selectedFloor = this.floorPlan[0];
            }
          }
        },
        error: (err: any) => {},
      });
  }

  selectedRoom(floor: any) {
    this.selectedFloor = floor;
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

  CloseTrigerFromChild() {
    this.showFloorPlan = false;
  }

  redirect(path: string) {
    this.router.navigateByUrl(path);
  }
}
