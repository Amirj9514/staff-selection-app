import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Staff } from '../interfaces/staffFilter.interface';

@Injectable({
  providedIn: 'root',
})
export class StaffModuleService {
  private selectedStaff = new BehaviorSubject<Staff | null>(null);

  private allStaffList = new BehaviorSubject<Staff[]>([]);
  private selectedStafList = new BehaviorSubject<Staff[]>([]);

  constructor() {}

  // ----------------------------------------------
  //   Selected Staff Methods Start
  setSelectedStaff(data: Staff|null): void {
    this.selectedStaff.next(data);
  }

  getSelectedStaff(): Observable<Staff | null> {
    return this.selectedStaff.asObservable();
  }

  //   Selected Staff Methods Ends
  // ---------------------------------------------

  // ----------------------------------------------
  //   All Staff Methods Start

  updateStaffList(data: Staff[]): void {
    this.allStaffList.next(data);
  }

  getAllStaff(): Observable<Staff[]> {
    return this.allStaffList.asObservable();
  }

  //   All Staff Methods Ends
  // ---------------------------------------------
  // ----------------------------------------------
  //   Selected Staff List Methods Start

  updateSelectedStaffList(data: Staff[]): void {
    this.selectedStafList.next(data);

    console.log(this.selectedStafList);
  }

  getSelectStaffList(): Observable<Staff[]> {
    return this.selectedStafList.asObservable();
  }

  //   Selected Staff List Methods Ends
  // ---------------------------------------------
}
