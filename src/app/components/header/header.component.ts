import { takeUntil } from 'rxjs/operators';
import { Component, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

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
  private destroySubject$: Subject<void> = new Subject<void>();
  
  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.productsAmountObservable$.pipe(
      takeUntil(this.destroySubject$)
    ).subscribe((amount: number) => {
      this.productsAmount = amount;
      this.isBadgeHidden = amount > 0;
    });
  }
  public onShowSideNav(): void {
    this.showSideNav.emit();
    this.sideNavButton.nativeElement.blur();
  }
}
