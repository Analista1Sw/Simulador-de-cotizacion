import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosProyecto } from '../interfaces/DatosProyecto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  // private myAppUrl: string = 'http://10.1.2.154:8080/';
  // private myApiUrl: string = 'hefesto/prospectos/create';
  // private proyectosApiUrl: string = 'hefesto/proyecto/FindAll';
  private myAppUrl: string = '';
  private myApiUrl: string = '';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '';
  }

  // Obtén los tipos de apartamento basados en el ID del proyecto
  getTiposApartamento(proyectoId: number): Observable<any[]> {
    this.myApiUrl = 'apartamentos/proyecto/'
    return this.http.get<any[]>(this.myAppUrl+ this.myApiUrl+ proyectoId);
  }

  postProyecto(data: any): Observable<DatosProyecto> {
    this.myApiUrl ='prospectos/create'
    return this.http.post<DatosProyecto>(
      `${this.myAppUrl}${this.myApiUrl}`,
      data
    );
  }

  // Obtiene la lista de proyectos
  getProyectos(): Observable<DatosProyecto[]> {
    this.myApiUrl = 'proyecto/FindAll'
    return this.http.get<DatosProyecto[]>(
      `${this.myAppUrl}${this.myApiUrl}`
    );
  }
}
