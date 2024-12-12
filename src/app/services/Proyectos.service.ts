import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Proyecto } from '../interfaces/Proyecto';
import { DatosProyecto } from '../interfaces/DatosProyecto';
import { Apartamento } from '../interfaces/Proyecto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private myAppUrl: string = '';
  private myApiUrl: string = '';

  private myappUrl: string = 'http://10.1.2.181:9091/hefesto/';
  // private myApiUrl: string = 'hefesto/proyecto/create';
  // private proyectosApiUrl: string = 'hefesto/proyecto/FindAll';
  // private ApartamentoApiUrl: string = 'hefesto/apartamentosDetalle/create';
  // private ZonasApiUrl: string = 'hefesto/apartamentosDetalle/FindAll';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '';
  }

  postProyecto(data: any): Observable<Proyecto> {
    this.myApiUrl = 'proyecto/create';
    return this.http
      .post<Proyecto>(`${this.myAppUrl}${this.myApiUrl}`, data)
      .pipe(
        catchError((error) => {
          console.error('Error al crear el proyecto:', error);
          throw error;
        })
      );
  }

  getProyectos(): Observable<DatosProyecto[]> {
    this.myApiUrl = 'proyecto/FindAll'
    return this.http
      .get<DatosProyecto[]>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los proyectos:', error);
          throw error;
        })
      );
  }

  createApartamento(data: any): Observable<any> {
    this.myApiUrl = 'apartamentos/create';
    return this.http.post(this.myappUrl + this.myApiUrl, data).pipe(
      catchError((error) => {
        console.error('Error al crear el apartamento:', error);
        if (error.status === 400) {
          console.error('Detalles del error 400:', error.error);
        }
        throw error;
      })
    );
  }
  

  createApartamentosDetalle(data: any): Observable<any> {
    this.myApiUrl = 'apartamentosDetalle/Create'
    return this.http.post(this.myappUrl + this.myApiUrl, data).pipe(
      catchError((error) => {
        console.error('Error al crear el dettalle del apartamento:', error);
        throw error;
      })
    );
  }

  getZonas(): Observable<any[]> {
    this.myApiUrl = 'apartamentosDetalle/FindAll'
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      catchError((error) => {
        console.error('Error al obtener las zonas:', error);
        throw error;
      })
    );
  }

    // Método para obtener los apartamentos de un proyecto
    getApartamentosByProyecto(Id: number): Observable<Apartamento[]> {
      this.myApiUrl = `apartamentos/proyecto/${Id}`
      return this.http.get<Apartamento[]>(`${this.myAppUrl}${this.myApiUrl}`);  // Realizar la solicitud HTTP GET
    }

}
