export interface IFilter {
  filterName: string;
  filterApiName: string;
  checkedId: number
  filterValues: IFilterValue[];
}
export interface IFilterValue {
  value: string,
  id: number,
  name: string,
  checked: boolean
}