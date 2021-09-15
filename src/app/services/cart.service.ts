import { SORTING_METHOD } from './../enums';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from './../interfaces/product.interface';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { IOrder } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartSubject$: BehaviorSubject<IOrder[]> = new BehaviorSubject<IOrder[]>([]);
  private _productsAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _totalPriceSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _cartItems: IOrder[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  public addToCart(product: IProduct): void {
    const orders: IOrder[] = this.localStorageService.getOrdersLocalStorage();
    let order: IOrder = orders.find(localStorageOrder => localStorageOrder.id === product.id) as IOrder;
    if(!order) {
      const price: number = parseFloat(product.price || '0');
      const amountPrice = this.calcAmountPrice(1, price)
      order = {id: product.id, amount: 1, product, amountPrice};
      orders.push(order);
    } else {
      order.amount +=1;
      order.amountPrice = this.calcAmountPrice(order.amount, parseFloat(order.product.price || '0'))
    }
    this._cartItems = orders;
    this._cartSubject$.next(orders);
    this.calcTotalPrice(orders);
    this.calcOrdersAmount(orders);
    this.localStorageService.addOrderToLocalStorage(orders);
  }

  public removeFromCart(id: number): void {
    let orders: IOrder[] = this.localStorageService.getOrdersLocalStorage().filter(item => item.id != id);
    this._cartSubject$.next(orders);
    this.calcTotalPrice(orders);
    this.calcOrdersAmount(orders);
    this.localStorageService.addOrderToLocalStorage(orders);
  }

  public getOrders(): Observable<IOrder[]> {
    let orders: IOrder[] = this.localStorageService.getOrdersLocalStorage() as IOrder[];
    this._cartItems = orders;
    this._cartSubject$.next(orders);
    return this._cartSubject$.asObservable();
  }

  public getOrdersAmount(): Observable<number> {
    let orders: IOrder[] = this.localStorageService.getOrdersLocalStorage() as IOrder[];
    this.calcOrdersAmount(orders);
    return this._productsAmount$.asObservable()
  }

  private calcOrdersAmount(orders: IOrder[]): void {
    const amount: number = orders.reduce((prev: number, curr: IOrder) => {
      return prev + curr.amount
    },0) as number;
    this._productsAmount$.next(amount)
  }
  
  public getTotalPrice(): Observable<number> {
    let orders: IOrder[] = this.localStorageService.getOrdersLocalStorage() as IOrder[];
    this.calcTotalPrice(orders);
    return this._totalPriceSubject$.asObservable();
  }
  
  private calcTotalPrice(orders: IOrder[]): void {
    const totalPrice: number = orders.reduce((prev: number, curr: IOrder) => {
      return prev + curr.amountPrice
    }, 0) as number;
    this._totalPriceSubject$.next(totalPrice);
  }

  private calcAmountPrice(amount: number, price: number): number {
    return parseFloat((amount * price).toFixed(2));
  }
}
