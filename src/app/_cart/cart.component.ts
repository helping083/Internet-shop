import { IOrder } from './../interfaces/cart-order.interface';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public orders$: Observable<IOrder[]>;
  public itemsAmount$: Observable<number> = of(0);
  public totalPrice$: Observable<number> = of(0)
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.orders$ = this.cartService.getOrders();
    this.itemsAmount$ = this.cartService.getOrdersAmount();
    this.totalPrice$ = this.cartService.getTotalPrice();
  }
  public onRemoveFromCart(orderId: number): void {
    this.cartService.removeFromCart(orderId)
  }
  public onAddOrder(order:IOrder): void {
    this.cartService.addToCart(order.product)
  }
  public onRemoveOrder(order:IOrder):void {
    this.cartService.decreaseOrderAmount(order.product);
  }
}
