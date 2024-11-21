import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosProyecto } from '../interfaces/DatosProyecto';  


@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private myAppUrl: string = 'http://10.1.2.47:8080/'; 
  private myApiUrl: string = 'hefesto/prospectos/create'; 
  private proyectosApiUrl: string = 'hefesto/proyecto/FindAll';  

  constructor(private http: HttpClient) {}

  // Obtén los tipos de apartamento basados en el ID del proyecto
  getTiposApartamento(proyectoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}hefesto/apartamentos/proyecto/${proyectoId}`);
  }

 
  postProyecto(data: any): Observable<DatosProyecto> { 
    return this.http.post<DatosProyecto>(`${this.myAppUrl}${this.myApiUrl}`, data); 
  }

  // Obtiene la lista de proyectos
  getProyectos(): Observable<DatosProyecto[]> {
    return this.http.get<DatosProyecto[]>(`${this.myAppUrl}${this.proyectosApiUrl}`);
  }
}
