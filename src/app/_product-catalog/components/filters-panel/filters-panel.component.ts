import { IFilter, IFilterValue } from './../../../interfaces/filter.interface';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss']
})
export class FiltersPanelComponent implements OnInit {
  @Input() public filter: IFilter;
  public filters: IFilterValue[] = [];
  public filterValue: number;
  public panelOpenState: boolean = false;
  @Output() public filterCards: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }
  ngOnInit(): void {
    this.filter.filterValues.forEach((filterValue) => {
      this.filters.push(filterValue);
    });
  }

  /**
   * emits the filters name and the filters value
   * to the parent component where an http cal wil be made
   * in order to get filtered values from the server
   * @param {any} event
   * @returns {void}
   */
  public updateAllComplete(event: any): void {
    console.log(event)
    let obj = this.filters.find(o => o.id === this.filter.checkedId) as IFilterValue;
    let filterName = this.filter.filterApiName;
    let filterValue = obj.value;
    this.filterCards.emit({filterName, filterValue});
  };
}
