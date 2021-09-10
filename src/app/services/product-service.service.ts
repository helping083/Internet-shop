import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,  Subject } from 'rxjs';
import { IProduct } from '../interfaces';
import { SORTING_METHOD } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService  {
  private readonly URL: string = 'http://makeup-api.herokuapp.com/api/v1/products.json';
  
  private _productsOriginal$: Subject<IProduct[]> = new Subject<IProduct[]>();
  public readonly filteredProducts$: Observable<IProduct[]> = this._productsOriginal$.asObservable();

  private sortingMethod: SORTING_METHOD = SORTING_METHOD.UNSORTED;
  private searchValue: string = '';

  private _products: IProduct[] = [];

  constructor(private http: HttpClient) { }

  public getAllProducts(): void {
    this.http.get<IProduct[]>(this.URL)
      .subscribe((productsData: IProduct[]) => {
          this._products = productsData;
          this._productsOriginal$.next(productsData);
      });
  }
  private sortAndFilterProducts(): void {
    let modified = [...this._products];
    if(this.searchValue !== "") {
        modified = this.filterByName(modified);
    }
    if(this.sortingMethod !== SORTING_METHOD.UNSORTED) {
      modified = this.sortByMethod(this.sortingMethod, modified);
    }
    console.log(modified);
    this._productsOriginal$.next(modified);
  }
  private filterByName(products: IProduct[]): IProduct[] {
    return products.filter(product => product.name.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()));
  }
  public searchByName(name: string): void {
    this.searchValue = name;
    this.sortAndFilterProducts();
  }

  public sortProducts(sortingMethod: SORTING_METHOD): void {
    this.sortingMethod = sortingMethod;
    this.sortAndFilterProducts();
  }
  private sortByMethod(sortingMethod: SORTING_METHOD, products: IProduct[]):IProduct[] {
    console.log('test');
    const productsCopy: IProduct[] = [...products];
    switch(sortingMethod as SORTING_METHOD) {
      case SORTING_METHOD.DATE: {
        return this.sortByDate(productsCopy);
      }
      case SORTING_METHOD.EXPENSIVE: {
        return this.sortByHighestPrice(productsCopy);
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
    return products.sort((a: any, b: any) => <any>(a.rating === null) - <any>(b.rating === null) || parseInt(b.rating) - parseInt(a.rating));
  }
  private sortByHighestPrice(products: IProduct[]): IProduct[] {
    let sorted = products.sort((a: any, b: any) =>  <any>(a.price === null) - <any>(b.price === null) || parseFloat(b.price) - parseFloat(a.price));
    return sorted
  };
  private getTime(date: Date) {
    let dateInstance = new Date(date)
    return dateInstance != null ? dateInstance.getTime() : 0;
  }
  private sortByDate(products: IProduct[]): IProduct[] {
    let sorted =  products.sort((a: any, b: any) => {
      return this.getTime(a.created_at) - this.getTime(b.created_at);
    });
    return sorted;
  }
}
