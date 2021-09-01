import { ProductServiceService } from './services/product-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //todo: change favicon
  //87 pacakges are looking for fundin, run npm fund
  title = 'devcom-internet-shop';
  constructor(private product: ProductServiceService) {

  }
  public onGetAllProducts(e: Event):void {
    this.product.getAllProducts().subscribe((data: any) => {
      console.log(data)
    });
  }
}
