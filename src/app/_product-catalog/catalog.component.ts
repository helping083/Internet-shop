import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from './../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Subject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { SORTING_METHOD } from '../enums';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  //unsubscribed by using an async pipe
  public products: IProduct[] = [];
  public pageNumber: number = 0;
  public isLoading: boolean = true;
  public sorthingMethod: typeof SORTING_METHOD = SORTING_METHOD;
  public product_sort: FormControl = new FormControl();

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(private productService: ProductServiceService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getAllProducts()
    this
      .productService
      .filteredProducts$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((products: IProduct[]) => {
          this.products = products;
          this.isLoading = false;
      });
    this.product_sort
      .valueChanges
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((data: any) => {
        this.productService.sortProducts(data);
      });
  }

  public onAddToCart(product: IProduct): void {
      this.cartService.addToCart(product);
  }
  public onPagePaginate($event: any): void {
    console.log($event)
  }
  public originalOrder(a: KeyValue<string,string>, b: KeyValue<string,string>): number {
    return 0;
  }
  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
