import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToastComponent } from './components/toast/toast.component';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    HttpClientModule,
    SkeletonModule,
    ProgressSpinnerModule,
    // -------------------------------------------
    // Not Shared Modules
  ],
  exports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastComponent,
    HttpClientModule,
    SkeletonModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
})
export class SharedModule {}
