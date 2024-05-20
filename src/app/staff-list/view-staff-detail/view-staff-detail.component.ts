import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-staff-detail',
  templateUrl: './view-staff-detail.component.html',
  styleUrls: ['./view-staff-detail.component.scss'],
})
export class ViewStaffDetailComponent implements OnInit {
  @Input() localStorageData: any;
  @Input() selectedStaff: any;

  constructor() {}
  ngOnInit() {
    this.selectedStaff = {
      id: '1906',
      image:
        'https://s3.amazonaws.com/cdn1.mikronexus.com/2024/05/8_1716224167.jpg',
      driving_license: '',
      name: 'Driver 1 ',
      filters: [
        {
          filter_id: '1',
          filter_name: 'Experience',
          options: [
            {
              option_id: '3',
              option_name: '7+ Years',
            },
          ],
        },
        {
          filter_id: '2',
          filter_name: 'Gender',
          options: [
            {
              option_id: '4',
              option_name: 'Male',
            },
          ],
        },
        {
          filter_id: '3',
          filter_name: 'Certification',
          options: [
            {
              option_id: '8',
              option_name: 'B Grade',
            },
          ],
        },
      ],
    };
  }
}
