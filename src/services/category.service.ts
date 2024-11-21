import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://10.1.2.46:8080/'
    this.myApiUrl = 'hefesto/categoriaProducto/FindAll'

  }
  private myAppUrl : string = '';
  private myApiUrl: string = '';

  getListProducts(): Observable<Category[]>{
    return this.http.get<Category[]>(this.myAppUrl + this.myApiUrl);
  }

  getProductsByCategory(id:Number): Observable<Product[]>{
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl + 'categoria/'+id)
  }
}
