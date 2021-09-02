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
  //aliases fro components
  title = 'devcom-internet-shop';
  public isSideNavOpened: boolean = true;
  public sideNavRoutes: string[] = ['catalog', 'cart'];
  
  constructor(private product: ProductServiceService) {

  };

  public onGetAllProducts(e: Event): void {
    this.product.getAllProducts().subscribe((data: any) => {
      console.log(data)
    });
  };

  public onToggleDrawer(): void {
    this.isSideNavOpened = !this.isSideNavOpened;
    console.log('toggled !')
  };

}
