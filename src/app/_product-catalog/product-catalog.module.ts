import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { ProductCatalogRoutingModule } from './product-catalog-routing.module';


@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    ProductCatalogRoutingModule,
  ]
})
export class ProductCatalogModule { }
