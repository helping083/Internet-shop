import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CartRoutingModule
  ]
})
export class CartModule { }
