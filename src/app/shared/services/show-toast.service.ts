import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShowToast } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ShowToastService {
  private toastData = new Subject<ShowToast | null>();
  constructor() {}

  setToast(data: ShowToast): void {
    this.toastData.next(data);
  }

  showToast() {
    return this.toastData.asObservable();
  }
}
