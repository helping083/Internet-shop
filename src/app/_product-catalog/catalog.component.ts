import { takeUntil } from 'rxjs/operators';
import { IProduct } from './../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Subject } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  //unsubscribed by using an async pipe
  public products: IProduct[] = [];
  public p: number = 0;
  public isLoading: boolean = true;
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
  }

  public onAddToCart(product: IProduct): void {
      this.cartService.addToCart(product);
  }
  public onPagePaginate($event: any): void {
    console.log($event)
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
