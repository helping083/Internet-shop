import { IOrder } from './../interfaces/cart-order.interface';
import { Component, OnInit } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public orders$: Observable<IOrder[]>;
  public itemsAmount$: Observable<number> = of(0);
  public totalPrice$: Observable<number> = of(0);
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.orders$ = this.cartService.getOrders();
    this.itemsAmount$ = this.cartService.getOrdersAmount();
    this.totalPrice$ = this.cartService.getTotalPrice();
  }

  /**
   * invokes service method which removes
   * all cart items from cart and local storage
   * @param {number} orderId 
   * @returns {void}
   */
  public onRemoveFromCart(orderId: number): void {
    this.cartService.removeFromCart(orderId)
  }

  /**
   * adds order to the cart and local storage
   * @param {number} order
   * @returns {void}
   */
  public onAddOrder(order:IOrder): void {
    this.cartService.addToCart(order.product)
  }

  /**
   * decreases order amount
   * if we have 2 amount of the same item in the cart
   * if amount of the item equals 0, remove an order from the cart
   * @param order
   * @returns {void}
   */
  public onRemoveOrder(order:IOrder):void {
    this.cartService.decreaseOrderAmount(order.product);
  }
}
