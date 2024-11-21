// cotizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaterialesPorCategoria } from '../interfaces/MaterialesPorCategoria';
import { Producto } from '../interfaces/CategoriaProducto';

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private myAppUrl: string = 'http://10.1.2.47:8080/';
  private apartamentosApiUrl: string = 'hefesto/apartamentosDetalle/FindAll';
  private productosApiUrl: string = 'hefesto/producto/FindAll';
  private cotizacionApiUrl: string = 'hefesto/cotizaciones/create';
  constructor(private http: HttpClient) {}

  // Método para obtener zonas
  getZonas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.apartamentosApiUrl}`);
  }

  // Método para obtener materiales por zona (usando zonaId)
  getMaterialesByZona(zonaId: string): Observable<MaterialesPorCategoria> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.productosApiUrl}`).pipe(
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
    return this.http.get<Producto[]>(`${this.myAppUrl}${this.productosApiUrl}`);
  }

  // Método para enviar cotizaciones
  sendAllQuotes(productosAEnviar: Producto[]): Observable<any> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.cotizacionApiUrl}`,
      productosAEnviar
    );
  }
}
