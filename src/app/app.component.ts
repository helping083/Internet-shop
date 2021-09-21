import { IFilter } from './interfaces/filter.interface';
import { FiltersService } from './services/filters.service';
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
  title = 'makeup-internet-shop';
  public isFiltersSideNavSubscription: Subscription
  public filtersServiceSubscription: Subscription
  public isSideNavOpened: boolean = false;
  public isFilteredSideNavOpened: boolean = false;
  public filters: IFilter[];
  public sideNavRoutes: string[] = [ Routes.CATALOG, Routes.CART];
  
  constructor(  private productService: ProductServiceService, 
                private filtersService:FiltersService
  ) {};

  ngOnInit() {
    this.isFiltersSideNavSubscription = this.productService.getFiltersSideNavSubject()
      .subscribe((isFilteredSideNav: boolean) => {
        this.isFilteredSideNavOpened = isFilteredSideNav;
      });
    this.filtersServiceSubscription = this.filtersService.makeUpFilters$.subscribe((filters: IFilter[]) => {
      this.filters = filters;
    })
  }

  /**
   * closes sideNav menu
   * @returns {void}
   */
  public onCloseDrawer(): void {
    this.isSideNavOpened = false;  
  };

  /**
   * opens sideNav menu
   * @returns {void}
   */
  public onOpenDrawer(): void {
    this.isSideNavOpened =  true;
  }

  /**
   * callback which is invoked when filters side drawer starts closing
   * @returns {void}
   */
  onCloseSideDrawer() {
    this.productService.setFilterSideNavOpened(false)
  }

  ngOnDestroy() {
    this.isFiltersSideNavSubscription.unsubscribe();
    this.filtersServiceSubscription.unsubscribe();
  }
}
