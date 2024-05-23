import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-view-staff-detail',
  templateUrl: './view-staff-detail.component.html',
  styleUrls: ['./view-staff-detail.component.scss'],
})
export class ViewStaffDetailComponent implements OnInit {
  @Input() localStorageData: any;
  @Input() selectedStaff: any;
  @Input() selectedStaffList: any[] = [];
  @Input() allStaffList: any[] = [];
  @Output() cancelEvent = new EventEmitter<{
    isSelected: boolean;
    data: any;
  }>();

  activeStaff: { index: number; staff: any } = {
    index: NaN,
    staff: null,
  };

  visible: boolean = false;
  showFloorPlan: boolean = false;
  floorPlan: any[] = [];

  selectedFloor: any;

  constructor(private sharedS: SharedService) {}
  ngOnInit() {
    this.allStaffList.map((staff: any, index: number) => {
      if (staff.id == this.selectedStaff.id) {
        console.log(staff);
        this.activeStaff = { index, staff };
        console.log(this.activeStaff);
      }
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
}
