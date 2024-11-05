import { Injectable } from '@angular/core';
import { MaterialesPorCategoria } from '../app/cotizador/cotizador.component';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private cotizacion!: MaterialesPorCategoria;

  setCotizacion(cotizacion: MaterialesPorCategoria) {
    this.cotizacion = cotizacion;
  }

  getCotizacion(): MaterialesPorCategoria {
    return this.cotizacion;
  }
}
