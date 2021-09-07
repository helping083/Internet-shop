import { IProduct } from './../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products$: Observable<IProduct[]>;

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
    this.products$ = this.productService.filteredProducts$
  }
}
