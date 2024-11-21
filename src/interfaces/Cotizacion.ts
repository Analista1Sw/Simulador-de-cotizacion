import { MaterialesPorCategoria } from '../interfaces/MaterialesPorCategoria';

export interface Cotizacion {
  cotizacionId: number;
  cliente: string;
  proyecto: string;
  materiales: MaterialesPorCategoria;
}
