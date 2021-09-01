import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<any> {
    return this.http.get('http://makeup-api.herokuapp.com/api/v1/products.json');
  }
}
