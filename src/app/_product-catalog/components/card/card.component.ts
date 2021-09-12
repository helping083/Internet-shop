import { IProduct } from './../../../interfaces/product.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()  public productCard: IProduct;
  @Input()  public isListDisplay: boolean = false;
  @Output() public addCardToCart: EventEmitter<IProduct> = new EventEmitter<IProduct>()
  constructor() { }

  ngOnInit(): void {
  }

  public onAddToCart(): void {
    this.addCardToCart.emit(this.productCard);
    console.log('added', this.productCard)
  }
}
