import { IProduct } from './product.interface';

export interface IOrder {
    id: number;
    amount: number;
    product: IProduct
}