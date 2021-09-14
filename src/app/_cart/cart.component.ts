import { IOrder } from './../interfaces/cart-order.interface';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public orders$: Observable<IOrder[]>;
  private destroySubject$: Subject<void> = new Subject<void>();
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.orders$ = this.cartService.getOrders();
  }
  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete()
  }
}
