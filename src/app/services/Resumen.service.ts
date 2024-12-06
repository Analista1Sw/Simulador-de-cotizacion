import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private myAppUrl: string = '';
  private myApiUrl: string = '';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = ''
  }

  // Método para crear la cotización (POST)
  createCotizacion(data: any,id:number): Observable<any> {
    this.myApiUrl = 'cotizaciones/create'
    return this.http.post<any>(this.myAppUrl+this.myApiUrl,id,data);
  }

  // Método para obtener el resumen de la cotización (GET)
  getResumen(id: number): Observable<any> {
    const apiUrl = `detalleCotizacion/${id}/listar`; // URL específica para el resumen
    return this.http.get<any>(`${this.myAppUrl}${apiUrl}`);
  }
}
