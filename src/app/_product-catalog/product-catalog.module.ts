import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { ProductCatalogRoutingModule } from './product-catalog-routing.module';
import { CardComponent } from './components/card/card.component';
import { CardImageComponent } from './components/card-image/card-image.component';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [
    CatalogComponent,
    CardComponent,
    CardImageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductCatalogRoutingModule,
  ]
})
export class ProductCatalogModule { }
