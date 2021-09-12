import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCatalogModule } from './_product-catalog/product-catalog.module';
import { NgxPopperjsModule } from 'ngx-popperjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductCatalogModule,
    NgxPopperjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
