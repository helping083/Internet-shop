import { Router } from '@angular/router';
import { IProduct } from './../../interfaces/product.interface';
import { ProductServiceService } from './../../services/product-service.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Component, Output, EventEmitter, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FormControl } from '@angular/forms';
import { IOrder } from 'src/app/interfaces';
import { PopperContent } from 'ngx-popper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public showSideNav: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('sideNavButton', { read: ElementRef }) public sideNavButton: ElementRef<HTMLElement>;
  @ViewChild('tooltipcontent') public cartPopper: PopperContent;

  public productsAmount: number;
  public isBadgeHidden: boolean = true;
  public searchControl: FormControl = new FormControl();
  public orders: IOrder[] = [];
  public totalPrice: number = 0;
  private destroySubject$: Subject<void> = new Subject<void>();
  
  constructor(
    private cartService: CartService, 
    private productService: ProductServiceService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.cartService.getOrders().pipe(
      takeUntil(this.destroySubject$)
    ).subscribe((orders: IOrder[])=>{
      this.orders = orders
    })
    this.cartService.getOrdersAmount().pipe(
      takeUntil(this.destroySubject$)
    ).subscribe((amount: number) => {
      this.productsAmount = amount;
      this.isBadgeHidden = amount > 0;
    });
    this.cartService.getTotalPrice().subscribe((totalPrice: number) => {
      this.totalPrice = totalPrice;
    });
    this.searchControl.valueChanges.pipe(
        takeUntil(this.destroySubject$),
        debounceTime(400)
      ).subscribe((name: string) => {
        this.productService.searchByName(name)
    });
  }
  public onShowSideNav(): void {
    this.showSideNav.emit();
    this.sideNavButton.nativeElement.blur();
  }
  public onDecreaseOrder(order: IProduct): void {
    this.cartService.decreaseOrderAmount(order);
    this._hidePopper()
  }
  public onIncreaseOrder(order: IProduct): void {
    this.cartService.addToCart(order);
  }
  public onDeleteOrder(orderId: number): void {
    this.cartService.removeFromCart(orderId);
    this._hidePopper()
  }
  public onGoToCard(): void {
    this.router.navigate(['/cart'])
  }
  private _hidePopper(): void {
    if(this.orders.length === 0) {
      this.cartPopper.hide()
    }
  }
}
