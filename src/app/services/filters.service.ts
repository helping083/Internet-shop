import { IProduct } from './../interfaces/product.interface';
import { Injectable } from '@angular/core';
import { IFilter, IFilterValue } from './../interfaces/';
import { AsyncSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private _makeUpFiltersSubject$: AsyncSubject<IFilter[]> = new AsyncSubject<IFilter[]>();
  public readonly makeUpFilters$: Observable<IFilter[]> = this._makeUpFiltersSubject$.asObservable();

  constructor() { }

  /**
   * creates filters from products
   * and sends'em to the view
   * @param {IProduct[]} products 
   * @returns {void}
   */
  onCreateMakeUpFilters(products: IProduct[]): void {
    let categories: Set<string> = new Set();
    let tagList: Set<string> = new Set();
    let brand: Set<string> = new Set();
    let product_type: Set<string> = new Set();
    let filters: IFilter[] = [];

    products.forEach((product) => {
      if(product.category) {
        categories.add(product.category);
      }
      product.tag_list.forEach(item => tagList.add(item));
      if(product.brand) {
        brand.add(product.brand);
      }
      product_type.add(product.product_type);
    });

    filters.push({filterName: 'catergories',checkedId: 0, filterApiName: 'product_category', filterValues: this.formFilterValues([...categories], 'catergories')});
    filters.push({filterName: 'tag list',checkedId: 0,filterApiName: 'product_tags', filterValues: this.formFilterValues([...tagList], 'tag list')});
    filters.push({filterName: 'brand',checkedId: 0, filterApiName: 'brand' ,filterValues: this.formFilterValues([...brand], 'brand') });
    filters.push({filterName: 'product type',checkedId: 0, filterApiName: 'product_type', filterValues: this.formFilterValues([...product_type], 'product type') });
    this._makeUpFiltersSubject$.next(filters);
    this._makeUpFiltersSubject$.complete()
  };
  
  private formFilterValues(filter: string[], filterName: string): IFilterValue[] {
    return [{value: '', name: `show all by ${filterName}`, checked: true, id: 0}].concat(filter.map((filter, id) => {
      return { value: filter,name: filter, checked: false, id: id + 1}
    }))
  }
}
