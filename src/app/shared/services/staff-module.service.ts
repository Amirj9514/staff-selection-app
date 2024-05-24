import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Staff } from '../interfaces/staffFilter.interface';

@Injectable({
  providedIn: 'root',
})
export class StaffModuleService {
  private selectedStaff = new BehaviorSubject<Staff | null>(null);

  private allStaffList = new BehaviorSubject<Staff[]>([]);

  constructor() {}

  // ----------------------------------------------
  //   Selected Staff Methods Start
  setSelectedStaff(data: Staff) {
    this.selectedStaff.next(data);
  }

  getSelectedStaff(): Observable<Staff | null> {
    return this.selectedStaff.asObservable();
  }

  //   Selected Staff Methods Ends
  // ---------------------------------------------

  // ----------------------------------------------
  //   All Staff Methods Start

  updateStaffList(data: Staff[]) {
    this.allStaffList.next(data);
  }

  getAllStaff(): Observable<Staff[]> {
    return this.allStaffList.asObservable();
  }

  //   Selected Staff Methods Ends
  // ---------------------------------------------
}
