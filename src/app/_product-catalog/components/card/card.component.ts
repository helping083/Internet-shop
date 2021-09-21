import { IProduct } from './../../../interfaces/product.interface';
import { Component, Input,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent  {
  @Input()  public productCard: IProduct;
  @Input()  public isListDisplay: boolean = false;
  @Output() public addCardToCart: EventEmitter<IProduct> = new EventEmitter<IProduct>()
  
  constructor() { }

  /**
   * emits a value to the parent component in order to
   * add the item to the cart and local storage
   * @returns {void}
   */
  public onAddToCart(): void {
    this.addCardToCart.emit(this.productCard);
  }
}
