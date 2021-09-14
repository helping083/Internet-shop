import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CartRoutingModule,
    CommonModule
  ]
})
export class CartModule { }
