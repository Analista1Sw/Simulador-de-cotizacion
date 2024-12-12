// cotizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaterialesPorCategoria } from '../interfaces/MaterialesPorCategoria';
import { Producto } from '../interfaces/CategoriaProducto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private myAppUrl: string = '';
  private myApiUrl: string = '';

  // private myappUrl: string = 'http://10.1.2.181:9091/hefesto/';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '';
  }

  // Método para obtener zonas
  getZonas(): Observable<any[]> {
    this.myApiUrl = 'apartamentosDetalle/FindAll';
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Método para obtener materiales por zona (usando zonaId)
  getMaterialesByZona(zonaId: string): Observable<MaterialesPorCategoria> {
    this.myApiUrl = 'producto/FindAll';
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      map((productos: any[]) => {
        // Agregar el idZona a cada producto
        const productosConZona = productos.map((producto) => ({
          ...producto,
          idZona: zonaId, // Agregar el idZona a cada producto
        }));

        const materialesPorCategoria: MaterialesPorCategoria = {
          muros: [],
          pisos: [],
          techos: [],
          accesorios: [],
        };

        // Clasificar los productos por categoría
        productosConZona.forEach((producto) => {
          switch (producto.categoriaProductos.tipoCategoria) {
            case 'ACABADO MUROS':
              materialesPorCategoria.muros.push(producto);
              break;
            case 'ACABADO PISOS GENERALES':
              materialesPorCategoria.pisos.push(producto);
              break;
            case 'ACABADO TECHOS':
              materialesPorCategoria.techos.push(producto);
              break;
            default:
              materialesPorCategoria.accesorios.push(producto);
              break;
          }
        });

        return materialesPorCategoria;
      })
    );
  }

  // Método para obtener productos filtrados por categoría
  getProductosByCategoria(tipoCategoria: string): Observable<Producto[]> {
    this.myApiUrl = 'apartamentosDetalle/FindAll';
    return this.getProductos().pipe(
      map((productos: Producto[]) =>
        productos.filter((producto) =>
          producto.categoriaProductos.some(
            (categoria) => categoria.tipoCategoria === tipoCategoria
          )
        )
      )
    );
  }

  // Método para obtener todos los productos
  getProductos(): Observable<Producto[]> {
    this.myApiUrl = 'producto/FindAll';
    return this.http.get<Producto[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Método para enviar cotizaciones
  sendAllQuotes(idProspecto: number, productosAEnviar: any[]): Observable<any> {
    // Preparamos el cuerpo de la solicitud
    const cuerpoCotizacion = {
      idProspecto: idProspecto, // Aquí puedes obtener dinámicamente el id del prospecto si es necesario
      detalles: productosAEnviar, // Aquí van los productos con idZona, idProducto, y cantidad
    };

    this.myApiUrl = 'cotizaciones/create';
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}`,
      cuerpoCotizacion
    );
  }
}
