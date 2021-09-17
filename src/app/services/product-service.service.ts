import { FiltersService } from './filters.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import {  BehaviorSubject, Observable,  ReplaySubject,  Subject } from 'rxjs';
import { IProduct } from '../interfaces';
import { SORTING_METHOD } from '../enums';
import { exhaustMap, shareReplay, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService  {
  private readonly URL: string = 'http://makeup-api.herokuapp.com/api/v1/products.json';
  private _productsOriginal$: Subject<IProduct[]> = new Subject<IProduct[]>();
  public readonly filteredProducts$: Observable<IProduct[]> = this._productsOriginal$.asObservable();
  private _cache$: Map<string, Observable<IProduct[]>> = new Map();
  private _sortingMethod: SORTING_METHOD = SORTING_METHOD.UNSORTED;
  private _searchValue: string = '';

  private _products: IProduct[] = [];

  public cachedRequest$: BehaviorSubject<void | undefined | string> = new BehaviorSubject<void | undefined | string>(undefined);

  public allProducts$: Observable<IProduct[]> = this.cachedRequest$.pipe(
    exhaustMap((params: any) => {
      console.log('params in service', params)
      return this.http.get<IProduct[]>(this.URL, {params}) 
    }),
    tap((productsResponse: IProduct[]) => this._products = productsResponse),
    tap((productsResponse: IProduct[]) => this.filtersService.onCreateMakeUpFilters(productsResponse)),
    shareReplay(1)
  );
  constructor(private http: HttpClient, private filtersService:FiltersService) { }

  public refreshProducts(test:any) {
    this.cachedRequest$.next(test);
  }

  public searchByName(name: string): void {
    this._searchValue = name;
    this.sortAndFilterProducts();
  }

  public sortProducts(sortingMethod: SORTING_METHOD): void {
    this._sortingMethod = sortingMethod;
    this.sortAndFilterProducts();
  }

  private sortAndFilterProducts(): void {
    let modified = [...this._products];
    if(modified.length === 0) {
      this._productsOriginal$.next(modified);
      return;
    }
    if(this._searchValue !== "") {
        modified = this.filterByName(modified);
    }
    if(this._sortingMethod !== SORTING_METHOD.UNSORTED) {
      modified = this.sortByMethod(this._sortingMethod, modified);
    }
    console.log(modified);
    this._productsOriginal$.next(modified);
  }

  private filterByName(products: IProduct[]): IProduct[] {
    return products.filter(product => product.name.toLocaleLowerCase().includes(this._searchValue.toLocaleLowerCase()));
  }

  private sortByMethod(sortingMethod: SORTING_METHOD, products: IProduct[]):IProduct[] {
    const productsCopy: IProduct[] = [...products];
    switch(sortingMethod as SORTING_METHOD) {
      case SORTING_METHOD.DATE: {
        return this.sortByDate(productsCopy);
      }
      case SORTING_METHOD.EXPENSIVE: {
        return this.sortByHighestPrice(productsCopy);
      }
      case  SORTING_METHOD.CHEAPEST: {
        return this.sortByCheapestPrice(productsCopy);
      }
      case SORTING_METHOD.RATING: {
        return this.sortByRating(productsCopy);
      }
      default: { 
         return productsCopy;
      } 
   }
  }
  private sortByRating(products: IProduct[]): IProduct[] {
    return [...products].sort((a: any, b: any) => <any>(a.rating === null) - <any>(b.rating === null) || parseInt(b.rating) - parseInt(a.rating));
  }
  private sortByCheapestPrice(products: IProduct[]): IProduct[] {
      return [...products].sort((a: any, b: any) =>  <any>(a.price === null) - <any>(b.price === null) || parseFloat(a.price) - parseFloat(b.price));
  }
  private sortByHighestPrice(products: IProduct[]): IProduct[] {
    return [...products].sort((a: any, b: any) =>  <any>(a.price === null) - <any>(b.price === null) || parseFloat(b.price) - parseFloat(a.price));
  };

  private getTime(date: Date) {
    let dateInstance = new Date(date)
    return dateInstance != null ? dateInstance.getTime() : 0;
  }

  private sortByDate(products: IProduct[]): IProduct[] {
    let sorted =  [...products].sort((a: any, b: any) => {
      return this.getTime(a.created_at) - this.getTime(b.created_at);
    });
    return sorted;
  }
}
