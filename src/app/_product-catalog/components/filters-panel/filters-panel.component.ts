import { IFilter } from './../../../interfaces/filter.interface';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss']
})
export class FiltersPanelComponent implements OnInit {
  @Input() public filter: IFilter;
  public filters: any[] = [];
  public filterValue: string = ''
  public panelOpenState: boolean = false;
  @Output() public filterCards: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit(): void {
    this.filter.filterValues.forEach((filter) => {
      this.filters.push({value: filter, checked: false})
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
    let filterName = this.filter.filterApiName;
    let filterValue = this.filterValue;
    this.filterCards.emit({filterName, filterValue});
  };
}
