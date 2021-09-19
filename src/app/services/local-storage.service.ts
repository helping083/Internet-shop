import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_STORE } from '../enums';
import { IOrder } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public addOrderToLocalStorage(orders: IOrder[]): void {
    localStorage.setItem(LOCAL_STORAGE_STORE.ORDERS, JSON.stringify(orders));
  }
  public getOrdersLocalStorage(): IOrder[] {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_STORE.ORDERS) || '[]') as IOrder[];
  }
}
