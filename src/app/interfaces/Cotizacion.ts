import { MaterialesPorCategoria } from './MaterialesPorCategoria';

export interface Cotizacion {
  cotizacionId: number;
  cliente: string;
  proyecto: string;
  materiales: MaterialesPorCategoria;
}
