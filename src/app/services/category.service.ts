import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private myAppUrl: string = '';
  private myApiUrl: string = '';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '';
  }

  getListProducts(): Observable<Category[]> {
    this.myApiUrl = 'producto/FindAll';
    return this.http.get<Category[]>(this.myAppUrl + this.myApiUrl);
  }

  getProductsByCategory(id: Number): Observable<Product[]> {
    
    return this.http.get<Product[]>(
      this.myAppUrl + this.myApiUrl + 'categoria/' + id
    );
  }
}
