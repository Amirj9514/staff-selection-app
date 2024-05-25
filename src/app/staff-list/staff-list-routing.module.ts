import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list.component';
import { ViewStaffDetailComponent } from './view-staff-detail/view-staff-detail.component';
import { SelectRoomComponent } from './select-room/select-room.component';
import { CustomerComponent } from './customer/customer.component';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';

const routes: Routes = [
  {
    path: '',
    component: StaffListComponent,
  },
  {
    path: 'viewStaff',
    component: ViewStaffDetailComponent,
  },
  {
    path: 'table',
    component: SelectRoomComponent,
  },

  {
    path: 'customer',
    component: CustomerComponent,
  },

  {
    path: 'addCustomer',
    component: AddNewCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffListRoutingModule {}
