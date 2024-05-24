import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-select-room',
  templateUrl: './select-room.component.html',
  styleUrls: ['./select-room.component.scss'],
})
export class SelectRoomComponent implements OnInit {
  @Input() localStorageData: any;
  @Output() cancelEvent = new EventEmitter<boolean>();
  floorPlan: any[] = [];
  selectedFloor: any;
  roomLoaderApi: boolean = false;
  constructor(private sharedS: SharedService) {}

  ngOnInit() {
    this.getRooms();
  }
  getRooms() {
    this.roomLoaderApi = true;

    this.sharedS
      .sendPostRequest('menu/get_business_rooms', { business_id: 76 })
      .subscribe({
        next: (res: any) => {
          this.roomLoaderApi = false;
          console.log(res);
          if (res.success) {
            this.floorPlan = res.rooms;
            if (this.floorPlan && this.floorPlan.length > 0) {
              this.selectedFloor = this.floorPlan[0];
            }
          }
        },
        error: (err: any) => {
          this.roomLoaderApi = false;
        },
      });
  }

  selectRoom(data: any) {
    this.selectedFloor = data;
  }

  isActive(floor: any) {
    let ret = false;
    if (floor.id == this.selectedFloor.id) {
      ret = true;
    }

    return ret;
  }
  goBack() {
    this.cancelEvent.emit(false);
  }
}
