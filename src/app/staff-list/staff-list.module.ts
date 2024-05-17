import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffListRoutingModule } from './staff-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StaffListComponent } from './staff-list.component';

@NgModule({
  declarations: [StaffListComponent],
  imports: [CommonModule, StaffListRoutingModule, SharedModule],
})
export class StaffListModule {}
