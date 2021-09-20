import { FiltersService } from './filters.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProduct } from '../interfaces';
import { SORTING_METHOD } from '../enums';
import { shareReplay, tap, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService  {
  private readonly URL: string = '/api/v1/products.json';
  private _productsOriginal$: Subject<IProduct[]> = new Subject<IProduct[]>();
  public readonly filteredProducts$: Observable<IProduct[]> = this._productsOriginal$.asObservable();
  private _filterSideNavSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _cache$: Map<string, Observable<IProduct[]>> = new Map();
  private _sortingMethod: SORTING_METHOD = SORTING_METHOD.UNSORTED;
  private _searchValue: string = '';

  private _products: IProduct[] = [];

  public cachedRequest$: BehaviorSubject<void | undefined | string> = new BehaviorSubject<void | undefined | string>(undefined);

  /**
   * main observable which does cache http requests
   */
  public allProducts$: Observable<IProduct[]> = this.cachedRequest$.pipe(
    switchMap((params: any) => {
      let cacheUrl = this._formUrl(this.URL, params)
      if(!this._cache$.get(cacheUrl)) {
        this._cache$.set(cacheUrl, 
          this.http.get<IProduct[]>(this.URL, {params})
            .pipe(
              catchError((err) => {
                this._cache$.delete(cacheUrl);
                throw err;
              }),
              shareReplay(1)
            )
        )
      }
      return  this._cache$.get(cacheUrl) as Observable<IProduct[]>;
    }),
    tap((productsResponse: IProduct[]) => this._products = productsResponse),
    tap((productsResponse: IProduct[]) => this.filtersService.onCreateMakeUpFilters(productsResponse)),
    shareReplay(1)
  );
  constructor(private http: HttpClient, private filtersService:FiltersService) { }
  
  /**
   * gets a card detail data
   * @param {string} id
   * @returns Observable<IProduct>
   */
  public getCardDetails(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/api/v1/products/${id}.json`).pipe(catchError((err) => {
      throw err;
    }));
  }

  /**
   * refreshes cached http subject in order to
   * make http request to the server or to return
   * cached value from the cache
   * @param {any} params
   * @returns {any} 
   */
  public refreshProducts(params:any):void {
    this.cachedRequest$.next(params);
  }

  /**
   * filters products by search-bar's value
   * @param {string} name
   * @return {void} 
   */
  public searchByName(name: string): void {
    this._searchValue = name;
    this.sortAndFilterProducts();
  };

  /**
   * sort products by enum value (sort by rating, date, price e.t.c)
   * @param {SORTING_METHOD} sortingMethod 
   * @returns {void}
   */
  public sortProducts(sortingMethod: SORTING_METHOD): void {
    this._sortingMethod = sortingMethod;
    this.sortAndFilterProducts();
  }

  /**
   * sorts and filter products based on filters values
   * @returns {void}
   */
  private sortAndFilterProducts(): void {
    let modified = [...this._products];
    if(modified.length === 0) {
      this._productsOriginal$.next(modified);
      return;
    }
    if(this._searchValue !== "") {
        modified = this._filterByName(modified);
    }
    if(this._sortingMethod !== SORTING_METHOD.UNSORTED) {
      modified = this._sortByMethod(this._sortingMethod, modified);
    }
    this._productsOriginal$.next(modified);
  }

  /**
   * helper function for filtering products based on sort value
   * @param {IProduct[]} products 
   * @returns {IProduct[]}
   */
  private _filterByName(products: IProduct[]): IProduct[] {
    return products.filter(product => product.name.toLocaleLowerCase().includes(this._searchValue.toLocaleLowerCase()));
  }

  /**
   * helper function for sorting values based on sort value
   * (rating, price, amount e.t.c)
   * @param {SORTING_METHOD} sortingMethod 
   * @param {IProduct[]} products 
   * @returns {IProduct[]}
   */
  private _sortByMethod(sortingMethod: SORTING_METHOD, products: IProduct[]):IProduct[] {
    const productsCopy: IProduct[] = [...products];
    switch(sortingMethod as SORTING_METHOD) {
      case SORTING_METHOD.DATE: {
        return this._sortByDate(productsCopy);
      }
      case SORTING_METHOD.EXPENSIVE: {
        return this._sortByHighestPrice(productsCopy);
      }
      case  SORTING_METHOD.CHEAPEST: {
        return this._sortByCheapestPrice(productsCopy);
      }
      case SORTING_METHOD.RATING: {
        return this._sortByRating(productsCopy);
      }
      default: { 
         return productsCopy;
      } 
   }
  }

  /**
   * helper function for sorting products by the rating property
   * @param {IProduct[]} products 
   * @returns {IProduct[]}
   */
  private _sortByRating(products: IProduct[]): IProduct[] {
    return [...products].sort((a: any, b: any) => <any>(a.rating === null) - <any>(b.rating === null) || parseInt(b.rating) - parseInt(a.rating));
  }

  /**
   * helper function for sorting products from cheapest to the most expensive
   * @param {IProduct[]} products 
   * @returns {IProduct[]}
   */
  private _sortByCheapestPrice(products: IProduct[]): IProduct[] {
      return [...products].sort((a: any, b: any) =>  <any>(a.price === null) - <any>(b.price === null) || parseFloat(a.price) - parseFloat(b.price));
  }

  /**
   * sort products from the most expensive to the cheapest
   * based on the price property
   * @param {IProduct[]} products
   * @returns {IProductp}
   */
  private _sortByHighestPrice(products: IProduct[]): IProduct[] {
    return [...products].sort((a: any, b: any) =>  <any>(a.price === null) - <any>(b.price === null) || parseFloat(b.price) - parseFloat(a.price));
  };

  private _getTime(date: Date) {
    let dateInstance = new Date(date)
    return dateInstance != null ? dateInstance.getTime() : 0;
  }

  /**
   * utility function for sorting products by date
   * @param {IProduct[] }products 
   * @returns {IProduct[]}
   */
  private _sortByDate(products: IProduct[]): IProduct[] {
    let sorted =  [...products].sort((a: any, b: any) => {
      return this._getTime(a.created_at) - this._getTime(b.created_at);
    });
    return sorted;
  }

  /**
   * utility function for forming url for caching or retrieving observables from the cache
   * @param {string} url 
   * @param {any} params 
   * @returns {string}
   */
  private _formUrl(url: string, params: any): string {
    return params  ? `${url}?${params.toString()}`: `${url}?`;
  }

  /**
   * return side nav filters observable for controlling side nav filter
   * @returns {Observable<boolean>}
   */
  public getFiltersSideNavSubject(): Observable<boolean> {
    return this._filterSideNavSubject.asObservable();
  }

  /**
   * updates sideNav filters observable
   * @param {boolean} isFilterSideNavOpened
   * @returns {void}
   */
  public setFilterSideNavOpened(isFilterSideNavOpened: boolean): void {
    this._filterSideNavSubject.next(isFilterSideNavOpened);
  }
}
