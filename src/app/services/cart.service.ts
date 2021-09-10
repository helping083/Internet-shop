import { SORTING_METHOD } from './../enums';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from './../interfaces/product.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartSubject$: Subject<IProduct[]> = new Subject<IProduct[]>();
  private _productsAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public readonly cartObservable$: Observable<IProduct[]> = this._cartSubject$.asObservable();
  public readonly productsAmountObservable$: Observable<number> = this._productsAmount$.asObservable();
  

  private _cartItems: IProduct[] = [];

  constructor() { }

  public addToCart(product: IProduct): void {
    let val = this._productsAmount$.value;
    val++
    this._cartItems.push(product);
    this._cartSubject$.next(this._cartItems.slice());
    this._productsAmount$.next(val)
  }

  public removeFromCart(id: number): void {
    this._cartItems = this._cartItems.filter(product => product.id === id);
    this._cartSubject$.next(this._cartItems);
  }

}
