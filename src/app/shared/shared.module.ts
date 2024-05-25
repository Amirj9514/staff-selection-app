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
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { FloatLabelModule } from 'primeng/floatlabel';
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
    DropdownModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
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
    DropdownModule,
    ButtonModule,
    RippleModule,
    FloatLabelModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
  ],
  providers: [MessageService],
})
export class SharedModule {}
