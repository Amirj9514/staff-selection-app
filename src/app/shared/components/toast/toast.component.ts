import { Component, OnInit } from '@angular/core';
import { ShowToast } from '../../interfaces/toast.interface';
import { ShowToastService } from '../../services/show-toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  isToastOpen: boolean = false;
  toastData: ShowToast | null = null;
  constructor(private showToastS: ShowToastService) {}

  ngOnInit() {
    this.getToastData();
  }
  getToastData() {
    this.showToastS.showToast().subscribe((data: ShowToast | null) => {
      this.toastData = data;
      if (this.toastData?.show) {
        this.setOpen(true);
      }
    });
  }
  setOpen(show: boolean) {
    this.isToastOpen = show;
  }
}
