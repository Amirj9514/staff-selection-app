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
  constructor(private sharedS: SharedService, private router: Router) {}

  ngOnInit() {
    this.getLocalStorageData();
  }

  getLocalStorageData() {
    this.sharedS.getData().subscribe((data: any) => {
      this.localStorageData = data;
    });
  }

  redirect(){
    this.router.navigateByUrl('/staffList')
  }
}
