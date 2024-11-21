import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/Proyecto';
import { DatosProyecto } from '../interfaces/DatosProyecto';


@Injectable({
    providedIn: 'root',
})
export class ProyectoService {
    private myAppUrl: string = 'http://10.1.2.46:8080/';
    private myApiUrl: string = 'hefesto/proyecto/create';
    private proyectosApiUrl: string = 'hefesto/proyecto/FindAll'; 


    constructor(private http: HttpClient) { }

    postProyecto(data: any): Observable<Proyecto> {
        return this.http.post<Proyecto>(`${this.myAppUrl}${this.myApiUrl}`, data);
    }

    getProyectos(): Observable<DatosProyecto[]> {
        return this.http.get<DatosProyecto[]>(`${this.myAppUrl}${this.proyectosApiUrl}`);
      }
}