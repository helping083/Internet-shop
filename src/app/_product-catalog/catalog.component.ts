import { FormControl } from '@angular/forms';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { IProduct } from './../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Subject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { SORTING_METHOD } from '../enums';
import { KeyValue } from '@angular/common';
import { SHOWING_METHOD } from './enums';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products: IProduct[] = [];
  public paginationPageNumber: number = 0;
  public isLoading: boolean = true;
  public isCardLoading: boolean = true;
  public sorthingMethod: typeof SORTING_METHOD = SORTING_METHOD;
  public cartDisplayEnum: typeof SHOWING_METHOD = SHOWING_METHOD
  public cartDisplayMethod: SHOWING_METHOD = SHOWING_METHOD.TILE;
  public productsSortController: FormControl = new FormControl();
  
  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(private productService: ProductServiceService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.allProducts$.pipe(takeUntil(this.destroySubject$))
      .subscribe((data: IProduct[]) => {
        console.log('works')
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
        console.log('values changed')
        this.productService.sortProducts(data);
      });
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
  public testReplay(): void {
      this.isCardLoading = true;
      this.productService.refreshProducts();
  }
  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
