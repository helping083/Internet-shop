import { Observable, BehaviorSubject } from 'rxjs';
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

  /**
   * adds or create item to the local storage and service state
   * and updates service state/order amount/total price/item amount
   * @param {IProduct} product
   */
  public addToCart(product: IProduct): void {
    const orders: IOrder[] = this.localStorageService.getOrdersLocalStorage();
    let order: IOrder = orders.find(localStorageOrder => localStorageOrder.id === product.id) as IOrder;
    if(!order) {
      const price: number = parseFloat(product.price || '0');
      const amountPrice = this._calcAmountPrice(1, price)
      order = {id: product.id, amount: 1, product, amountPrice};
      orders.push(order);
    } else {
      order.amount +=1;
      order.amountPrice = this._calcAmountPrice(order.amount, parseFloat(order.product.price || '0'))
    }
    this._cartItems = orders;
    this._refreshState(orders)
  }

  /**
   * removes an order from the cart and local storage
   * and updates service state/order amount/total price/item amount
   * @param {number} id
   * @param {void}
   */
  public removeFromCart(id: number): void {
    let orders: IOrder[] = this.localStorageService.getOrdersLocalStorage().filter(item => item.id != id);
    this._refreshState(orders)
  }

  /**
   * decreases order amount
   * if order amount === 0, deletes
   * updates service state/order amount/total price/item amount
   * @param {IProduct} product 
   * @returns {void}
   */
  public decreaseOrderAmount(product: IProduct): void {
    const orders: IOrder[] = this.localStorageService.getOrdersLocalStorage();
    let order: IOrder = orders.find(localStorageOrder => localStorageOrder.id === product.id) as IOrder;
    order.amount -=1;
 
    if(order.amount === 0) {
      this.removeFromCart(order.id);
    } else {
      order.amountPrice = this._calcAmountPrice(order.amount, parseFloat(order.product.price || '0'))
      this._refreshState(orders)
    }
  }

  /**
   * retrieves items from local storage
   * @returns {Observable<IOrder[]>}
   */
  public getOrders(): Observable<IOrder[]> {
    let orders: IOrder[] = this.localStorageService.getOrdersLocalStorage() as IOrder[];
    this._cartItems = orders;
    this._cartSubject$.next(orders);
    return this._cartSubject$.asObservable();
  }

  /**
   * returns total orders amounts
   * @returns {Observable<number>}
   */
  public getOrdersAmount(): Observable<number> {
    let orders: IOrder[] = this.localStorageService.getOrdersLocalStorage() as IOrder[];
    this._calcOrdersAmount(orders);
    return this._productsAmount$.asObservable()
  }

  /**
   * updates service state/order amount/total price/item amount
   * @param {IOrder[]} orders
   * @returns {void} 
   */
  private _refreshState(orders: IOrder[]): void {
    this._cartSubject$.next(orders);
    this._calcTotalPrice(orders);
    this._calcOrdersAmount(orders);
    this.localStorageService.addOrderToLocalStorage(orders);
  }

  /**
   * calcs order amount and updates an observable to the view
   * @param {IOrder[]} orders 
   * @returns {void}
   */
  private _calcOrdersAmount(orders: IOrder[]): void {
    const amount: number = orders.reduce((prev: number, curr: IOrder) => {
      return prev + curr.amount
    },0) as number;
    this._productsAmount$.next(amount)
  }
  
  /**
   * gets and calc total orders price
   * and returns an observable to the view
   * @returns {Observable<number>}
   */
  public getTotalPrice(): Observable<number> {
    let orders: IOrder[] = this.localStorageService.getOrdersLocalStorage() as IOrder[];
    this._calcTotalPrice(orders);
    return this._totalPriceSubject$.asObservable();
  }
  
  /**
   * calcs total prive of an order and upadtes the view subject
   * @param {IOrder[]} orders 
   * @returns {void}
   */
  private _calcTotalPrice(orders: IOrder[]): void {
    const totalPrice: number = orders.reduce((prev: number, curr: IOrder) => {
      return prev + curr.amountPrice
    }, 0) as number;
    this._totalPriceSubject$.next(totalPrice);
  }

  /**
   * utility function which calculates total price of an order item
   * @param {number} amount 
   * @param {number} price 
   * @returns {number}
   */
  private _calcAmountPrice(amount: number, price: number): number {
    return parseFloat((amount * price).toFixed(2));
  }
}
