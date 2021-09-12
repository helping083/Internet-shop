import { ProductServiceService } from './../../services/product-service.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Component, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public showSideNav: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('sideNavButton', { read: ElementRef }) private sideNavButton: ElementRef<HTMLElement>;
  public productsAmount: number;
  public isBadgeHidden: boolean = true;
  public searchControl: FormControl = new FormControl();

  private destroySubject$: Subject<void> = new Subject<void>();
  
  constructor(private cartService: CartService, private productService: ProductServiceService) {
  }

  ngOnInit() {
    this.cartService.productsAmountObservable$.pipe(
      takeUntil(this.destroySubject$)
    ).subscribe((amount: number) => {
      this.productsAmount = amount;
      this.isBadgeHidden = amount > 0;
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
}
