import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService  {
  private _productsOriginal$: Subject<IProduct[]> = new Subject<IProduct[]>();
  public readonly filteredProducts$: Observable<IProduct[]> = this._productsOriginal$.asObservable();
  private _products: IProduct[] = [];

  constructor(private http: HttpClient) { }

  public getAllProducts(): void {
    this.http.get<IProduct[]>('http://makeup-api.herokuapp.com/api/v1/products.json')
      .subscribe((productsData: IProduct[]) => {
          this._products = productsData;
          this._productsOriginal$.next(productsData);
      });
  }
}
