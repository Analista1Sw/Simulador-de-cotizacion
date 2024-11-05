import { Injectable } from '@angular/core';
import { environment } from '../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl : string = '';
  private myApiUrl: string = '';


  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'productos/'

  }

  getListProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteProduct(id:number): Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl+ id)
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product)
  }

  getProduct(id:Number): Observable<Product>{
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id)
  }

  updateProduct(id:number, producto:Product): Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id,producto)
  }

  getProductsByCategory(id:Number): Observable<Product[]>{
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl + 'categoria/'+id)
  }



}
