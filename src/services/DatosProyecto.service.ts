import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosProyecto } from '../interfaces/DatosProyecto';  // Importa la interfaz correctamente


@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private myAppUrl: string = 'http://10.1.2.38:8080/'; 
  private myApiUrl: string = 'prospectos/create'; // El endpoint de creación
  private proyectosApiUrl: string = 'proyecto/FindAll';  // Endpoint para obtener proyectos

  constructor(private http: HttpClient) {}

  // Obtén los tipos de apartamento basados en el ID del proyecto
  getTiposApartamento(proyectoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}apartamentos/proyecto/${proyectoId}`);
  }

  // Envía los datos del proyecto al backend
  postProyecto(data: any): Observable<DatosProyecto> { // Aquí devolvemos un solo objeto
    return this.http.post<DatosProyecto>(`${this.myAppUrl}${this.myApiUrl}`, data); 
  }

  // Obtiene la lista de proyectos
  getProyectos(): Observable<DatosProyecto[]> {
    return this.http.get<DatosProyecto[]>(`${this.myAppUrl}${this.proyectosApiUrl}`);
  }
}
