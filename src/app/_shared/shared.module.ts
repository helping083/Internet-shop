import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent
  ]
})
export class SharedModule { }
