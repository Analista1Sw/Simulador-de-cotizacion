import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-resumen-cotizacion',
  standalone: true,
  templateUrl: './resumen-cotizacion.component.html',
  imports: [CommonModule, ButtonModule],
})
export class ResumenCotizacionComponent implements OnInit {
  idCotizacion: string | null = null;
  detallesCotizacion: any = null;
  productosPorZona: any[] = [];
  totalCotizacion: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Capturando parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      console.log('Parámetros de la ruta:', params); // Verifica todos los parámetros
      this.idCotizacion = params.get('idCotizacion'); // Captura el parámetro dinámico
      console.log('ID de Cotización capturado:', this.idCotizacion); // Verifica el valor capturado

      if (this.idCotizacion) {
        this.obtenerDetallesCotizacion(this.idCotizacion);
      } else {
        console.error('ID de cotización no encontrado.');
      }
    });
  }

  obtenerDetallesCotizacion(id: string) {
    const url = `http://200.122.250.66:9095/hefesto/detalleCotizacion/${id}/listar`;
    console.log('Llamando al backend con URL:', url); // Verifica la URL

    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Respuesta del backend:', response); // Muestra la respuesta del backend
        this.detallesCotizacion = response;

        // Procesar zonas dinámicamente
        this.productosPorZona = this.mapearProductosPorZona(response);
        this.totalCotizacion = response.totalCotizacion;
        console.log('Productos por zona:', this.productosPorZona); // Muestra el procesamiento de zonas
        console.log('Total de la cotización:', this.totalCotizacion); // Verifica el total
      },
      (error) => {
        console.error('Error al obtener detalles de cotización:', error);
      }
    );
  }

  mapearProductosPorZona(data: any): any[] {
    const zonas = [];
    for (let i = 1; i <= 5; i++) {
      if (data[`productosZona${i}`]) {
        zonas.push({
          zona: `Zona ${i}`,
          productos: data[`productosZona${i}`]
        });
      }
    }
    console.log('Zonas mapeadas:', zonas); // Verifica el mapeo de zonas
    return zonas;
  }
  // Función para redirigir a la página de fidelización
  volverAFidelizacion(): void {
    this.router.navigate(['/fidel']);  
  }
}
