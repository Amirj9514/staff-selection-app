import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffListRoutingModule } from './staff-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StaffListComponent } from './staff-list.component';
import { ViewStaffDetailComponent } from './view-staff-detail/view-staff-detail.component';
import { SelectRoomComponent } from './select-room/select-room.component';
import { CustomerComponent } from './customer/customer.component';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';

@NgModule({
  declarations: [
    StaffListComponent,
    ViewStaffDetailComponent,
    SelectRoomComponent,
    CustomerComponent,
    AddNewCustomerComponent,
  ],
  imports: [CommonModule, StaffListRoutingModule, SharedModule],
})
export class StaffListModule {}
