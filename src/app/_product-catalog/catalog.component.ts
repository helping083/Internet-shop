import { IFilter } from './../interfaces/filter.interface';
import { FiltersService } from './../services/filters.service';
import { FormControl } from '@angular/forms';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { IProduct } from './../interfaces/product.interface';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Subject, Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { SORTING_METHOD } from '../enums';
import { KeyValue } from '@angular/common';
import { SHOWING_METHOD } from './enums';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnChanges {
  public products: IProduct[] = [];
  public paginationPageNumber: number = 0;
  public paginationPageAmount: number = 8;
  public paginationPageAmountOptions: number[] = [1,4,8,16,20,50,100];
  public isLoading: boolean = true;
  public isCardLoading: boolean = true;
  public sorthingMethod: typeof SORTING_METHOD = SORTING_METHOD;
  public cartDisplayEnum: typeof SHOWING_METHOD = SHOWING_METHOD
  public cartDisplayMethod: SHOWING_METHOD = SHOWING_METHOD.TILE;
  public productsSortController: FormControl = new FormControl();
  public filters: IFilter[];
  private _params: {[key: string]: string} = {};
  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private productService: ProductServiceService, 
    private cartService: CartService,
    private route: ActivatedRoute,
    private serializer: UrlSerializer,
    private filtersService: FiltersService ) { }
  ngOnChanges() {

  }
  ngOnInit(): void {
    this.isLoading = true;
    this.filtersService.makeUpFilters$.pipe(takeUntil(this.destroySubject$))
      .subscribe((filters: IFilter[]) => {
        this.filters = filters;
      });
    this.productService.allProducts$.pipe(takeUntil(this.destroySubject$))
      .subscribe((data: IProduct[]) => {
        this.products = data;
        this.isLoading = false;
        this.isCardLoading = false;
      })
    this
      .productService
      .filteredProducts$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((products: IProduct[]) => {
          console.log('filtered products work');
          this.products = products;
      });
    this.productsSortController
      .valueChanges
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((data: any) => {
        this.productService.sortProducts(data);
      });
    this.route.queryParams.pipe(takeUntil(this.destroySubject$))
      .subscribe((params: any) => {
        this._params = params
      })
  }

  public onAddToCart(product: IProduct): void {
      this.cartService.addToCart(product);
  }
  public onChangeDisplayCards(displayMethod: SHOWING_METHOD):void {
    this.cartDisplayMethod = displayMethod;
  }
  public originalOrder(a: KeyValue<string,string>, b: KeyValue<string,string>): number {
    return 0;
  }
  public testReplay(e: {[key: string]: string}): void {
      const {filterName, filterValue} = e
      let params: HttpParams = new HttpParams()
      let queryParams: {[key: string]: string} = {};
      Object.keys(this._params).forEach((key: any) => {
        params = params.set(key, this._params[key])
        queryParams[key] = this._params[key];
      })
      if(e.filterValue === '') {
        delete queryParams[filterName]
        params = params.delete(filterName);
      } else {
        params = params.set(filterName, filterValue);
        queryParams[filterName] = filterValue;
      }
      this.isCardLoading = true;
      this.productService.refreshProducts(params);
      this.router.navigate(['/catalog'], {queryParams});
      this.paginationPageNumber = 0
  }
  public onOpenFiltersSideNav(): void {
    this.productService.setFilterSideNavOpened(true);
  }
  private refresh(): void {
    let params: HttpParams = new HttpParams()
    this.productService.refreshProducts(params);
  }
  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
    console.log('destroyed');
    this.refresh();
  }
}
