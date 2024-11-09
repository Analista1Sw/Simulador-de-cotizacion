import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/Proyecto'; 

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private myAppUrl = 'http://10.1.2.38:8080/prospectos/create'; // Verifica que esta URL sea la correcta

  constructor(private http: HttpClient) {}

  // Método para hacer un POST que devuelve proyectos
  postProyecto(data: any): Observable<any> {
    return this.http.post<any>(this.myAppUrl, data);
  }
}
