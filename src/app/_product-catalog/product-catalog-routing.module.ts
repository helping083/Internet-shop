import { CatalogRoutesEnum } from './enums/';
import { CatalogComponent } from './catalog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardDetailsComponent } from './pages/card-details/card-details.component';

const routes: Routes = [
  {
    path: '', component: CatalogComponent, pathMatch: 'prefix',
    children: [
      {path: CatalogRoutesEnum.DETAILS, component: CardDetailsComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCatalogRoutingModule { }
