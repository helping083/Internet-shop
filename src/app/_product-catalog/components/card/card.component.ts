import { IProduct } from './../../../interfaces/product.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()  public productCard: IProduct;
  @Output() public addToCart: EventEmitter<IProduct> = new EventEmitter<IProduct>()
  constructor() { }

  ngOnInit(): void {
  }

  public onAddToCart(): void {
    this.addToCart.emit(this.productCard);
    console.log('added', this.productCard)
  }
}
