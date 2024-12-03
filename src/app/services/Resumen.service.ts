// cotizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialesPorCategoria } from '../interfaces/MaterialesPorCategoria';
import { Producto } from '../interfaces/CategoriaProducto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  // private myAppUrl: string = 'http://10.1.2.154:8080/';
  // private resumenApiUrl: string = 'hefesto/detalleCotizacion/34/listar';
  private myAppUrl: string = '';
  private myApiUrl: string = '';
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '';
  }

  // Método para obtener resumen
  getResumen(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.myAppUrl}hefesto/detalleCotizacion/${id}/listar`
    );
  }
}
