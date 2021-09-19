import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCatalogModule } from './_product-catalog/product-catalog.module';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductCatalogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
