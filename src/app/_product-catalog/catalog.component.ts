import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private product: ProductServiceService) { }

  ngOnInit(): void {
    this.product.getAllProducts().subscribe((data: any) => {
      console.log(data);
    });
  }

}
