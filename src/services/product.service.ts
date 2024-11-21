import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private myAppUrl: string = 'http://10.1.2.46:8080/';
  private myApiUrl: string = 'hefesto/producto/';
  private myApiUrlE: string = '';
  constructor(private http: HttpClient) {}

  getListProducts(): Observable<Product[]> {
    this.myApiUrlE = 'FindAll';
    return this.http.get<Product[]>(
      this.myAppUrl + this.myApiUrl + this.myApiUrlE
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveProduct(product: Product): Observable<void> {
    this.myApiUrlE = 'create';
    return this.http.post<void>(
      this.myAppUrl + this.myApiUrl + this.myApiUrlE,
      product
    );
  }

  getProduct(id:Number): Observable<Product>{
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id)
  }

  updateProduct(id: number, product: Product): Observable<void> {
    this.myApiUrlE = 'update'; 
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${this.myApiUrlE}/${id}`, product);
  }

  getProductsByCategory(id: Number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.myAppUrl}${this.myApiUrl}categoria/${id}`
    );
  }
}
