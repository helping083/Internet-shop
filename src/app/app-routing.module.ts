import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './_product-catalog/catalog.component';

const routes: Routes = [
  {
    path: 'cart',
    loadChildren: () => import("./_cart/cart.module").then(m => m.CartModule)
  },
  {
    path: '',
    component: CatalogComponent,
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
