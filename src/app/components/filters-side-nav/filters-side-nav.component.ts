import { Subscription } from 'rxjs';
import { IFilter } from './../../interfaces/filter.interface';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-filters-side-nav',
  templateUrl: './filters-side-nav.component.html',
  styleUrls: ['./filters-side-nav.component.scss']
})
export class FiltersSideNavComponent implements OnInit, OnDestroy {
  @Input() public sideNavFilters: IFilter[];
  @Input() public isOpened: boolean = false;
  @ViewChild('drawer') public drawer: MatDrawer;
  @Output() public filtersSideNavClosed: EventEmitter<void> = new EventEmitter<void>();
  private _params: {[key: string]: string} = {};
  private routeSubscription: Subscription

  constructor(
    private router: Router,
    private productService: ProductServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.queryParams
      .subscribe((params: any) => {
        this._params = params;
      })
  }

  public onCloseSideDrawer(): void {
    this.filtersSideNavClosed.emit();
  }
  public onFilterSideNavCards(e: {[key: string]: string}): void {
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
    this.productService.refreshProducts(params);
    this.router.navigate(['/catalog'], {queryParams});
    this.drawer.close();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }
}
