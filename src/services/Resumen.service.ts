// cotizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialesPorCategoria } from '../interfaces/MaterialesPorCategoria';
import { Producto } from '../interfaces/CategoriaProducto';

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private myAppUrl: string = 'http://10.1.2.47:8080/';
  private resumenApiUrl: string = 'hefesto/detalleCotizacion/34/listar';
  constructor(private http: HttpClient) {}

  // Método para obtener resumen
  getResumen(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.resumenApiUrl}`);
  }
}
