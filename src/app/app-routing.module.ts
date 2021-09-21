import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './_product-catalog/catalog.component';
import { CardDetailsComponent } from './_product-catalog/pages/card-details/card-details.component';

const routes: Routes = [
  {
    path:'catalog',
    component: CatalogComponent,
  },
  {
    path: 'filters',
    component: CatalogComponent
  },
  {
    path: 'catalog/details/:id',
    component: CardDetailsComponent
  },
  {
    path: 'cart',
    loadChildren: () => import("./_cart/cart.module").then(m => m.CartModule)
  },
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
