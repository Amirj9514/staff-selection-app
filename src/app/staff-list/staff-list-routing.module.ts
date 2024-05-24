import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list.component';
import { ViewStaffDetailComponent } from './view-staff-detail/view-staff-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StaffListComponent,
  },
  {
    path: 'viewStaff',
    component: ViewStaffDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffListRoutingModule {}
