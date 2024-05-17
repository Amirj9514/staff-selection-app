import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { ShowToastService } from '../shared/services/show-toast.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  stafList: any[] = [];
  filterList: any[] = [];
  staffListLoader: boolean = false;

  filterForm!:FormGroup;
  constructor(
    private sharedS: SharedService,
    private showToastS: ShowToastService
  ) {}

  ngOnInit() {
    this.getStafList();
  }

  getStafList() {
    let apiParam: { business_id: string } = {
      business_id: '76',
    };

    this.stafList = Array.from({ length: 12 }).map((_, i) => `Item #${i}`);
    this.staffListLoader = true;
    this.sharedS
      .sendPostRequest('Staff_selection/getStaffList', apiParam)
      .subscribe({
        next: (res: any) => {
          this.staffListLoader = false;
          if (res.status && (res.status == 'true' || res.status == true)) {
            this.stafList = res.staff;
            this.filterList = res.filters;
          } else {
            this.stafList = [];
            this.showToastS.setToast({
              show: true,
              message: res.message,
            });
          }
        },
        error: (err: any) => {
          this.stafList = [];

          this.staffListLoader = false;
          this.showToastS.setToast({
            show: true,
            message: err.error.message ? err.error.message : 'Server Error',
          });
        },
      });
  }

  checkImg(img: string) {
    if (img && img.length > 0) {
      return img;
    }
    return '../../assets/icon/imag.jpg';
  }
}
