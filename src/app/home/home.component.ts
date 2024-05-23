import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  localStorageData: any;
  bannerList: any[] = [];
  constructor(private sharedS: SharedService, private router: Router) {}

  ngOnInit() {
    this.getLocalStorageData();
    this.getBannerDetail();
  }

  getLocalStorageData() {
    this.sharedS.getData().subscribe((data: any) => {
      this.localStorageData = data;
    });
  }

  getBannerDetail() {
    let bannerDetail = this.localStorageData?.banners;
    console.log(bannerDetail, bannerDetail.length);

    if (bannerDetail && bannerDetail.length > 0) {
      console.log(bannerDetail, bannerDetail.length);
      this.bannerList = bannerDetail;
    } else {
      let apiParam = { business_id: '76' };

      this.sharedS.sendPostRequest('events/get_banners', apiParam).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status == 'OK') {
            let banners = res.data?.banners;
            this.bannerList = banners ? banners : [];
            this.sharedS.insertData({ key: 'banners', val: this.bannerList });
          }
        },
        error: (err: any) => {},
      });
    }

    // if (bannerDetail && bannerDetail.lenght > 0) {
    //   console.log(bannerDetail);

    //   this.bannerList = bannerDetail;
    // } else {
    //   let apiParam = { business_id: '76' };

    //   this.sharedS.sendPostRequest('events/get_banners', apiParam).subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //       if (res.status == 'OK') {
    //         let banners = res.data?.banners;
    //         this.bannerList = banners ? banners : [];
    //         this.sharedS.insertData({ key: 'banners', val: this.bannerList });
    //       }
    //     },
    //     error: (err: any) => {},
    //   });
    // }
  }

  redirect() {
    this.router.navigateByUrl('/staffList');
  }
}
