import { CartService } from 'src/app/services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from './../../../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { IProductColor } from 'src/app/interfaces';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit, OnDestroy {
  public productDetailsSubscription: Subscription;
  public productDetail: IProduct = {} as IProduct;
  public productColors: IProductColor[] = [];
  public colorName: string = '';
  public tagLists: string[] = [];
  public isCardDetailsLoading: boolean = false
  constructor(
    private productService: ProductServiceService, 
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.isCardDetailsLoading = true;
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.productDetailsSubscription = this.productService
                                        .getCardDetails(id)
                                        .subscribe((productDetails: IProduct) => {
      this.productDetail = productDetails
      this.productColors = productDetails.product_colors;
      this.tagLists = productDetails.tag_list;
      this.isCardDetailsLoading = false
    });
  }
  ngOnDestroy() {
    this.productDetailsSubscription.unsubscribe();
  }
  public onAddToCart(): void {
    this.cartService.addToCart(this.productDetail)
  }
}
