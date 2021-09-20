import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductServiceService } from './services/product-service.service';
import { Routes } from './enums/';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  //todo: change favicon
  //87 pacakges are looking for fundin, run npm fund
  //aliases fro components
  //todo trackbyfn
  // add global styles like gloal media
  // add media query scss functions
  //add logo to header
  //error handling in services
  //restart app handle http params
  // functions descriptions (comments)
  // routing modules description(like function descriptions, look in new_pfa)
  // padding cards on media
  // max-width of cards on media
  title = 'makeup-internet-shop';
  public isFiltersSideNavSubscription: Subscription
  public isSideNavOpened: boolean = false;
  public isFilteredSideNavOpened: boolean = false;
  public sideNavRoutes: string[] = [ Routes.CATALOG, Routes.CART];
  
  constructor(private productService: ProductServiceService) {

  };
  ngOnInit() {
    this.isFiltersSideNavSubscription = this.productService.getFiltersSideNavSubject()
      .subscribe((isFilteredSideNav: boolean) => {
        this.isFilteredSideNavOpened = isFilteredSideNav;
      })
  }
  public onCloseDrawer(): void {
    this.isSideNavOpened = false;
    console.log('drawer closed !')
  };
  public onOpenDrawer(): void {
    this.isSideNavOpened =  true;
    console.log('drawer opened');
  }
  onCloseSideDrawer() {
    this.productService.setFilterSideNavOpened(false)
  }
  ngOnDestroy() {
    this.isFiltersSideNavSubscription.unsubscribe()
  }
}
