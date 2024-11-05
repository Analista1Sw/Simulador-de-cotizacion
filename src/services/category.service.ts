import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'categorias/'

  }
  private myAppUrl : string = '';
  private myApiUrl: string = '';

  getListProducts(): Observable<Category[]>{
    return this.http.get<Category[]>(this.myAppUrl + this.myApiUrl);
  }
}
