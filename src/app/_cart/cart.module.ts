import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { BarRatingModule } from "ngx-bar-rating";
@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    MatIconModule,
    BarRatingModule,
    CartRoutingModule,
    CommonModule
  ]
})
export class CartModule { }
