export interface Material {
  id: number;
  nombre?: string;
  cantidad: number;
  categoria: string;
}
export interface Material extends Producto {
  categoria: string;
}

export interface MaterialesPorCategoria {
  muros: Material[];
  pisos: Material[];
  techos: Material[];
  accesorios: Material[];
}

export interface Zona {
  id?: number;
  nombre: string;
  label?: string;
}

export interface CategoriaProducto {
  id: number;
  tipoCategoria: string;
  descripcionCategoria: string;
}

export interface Producto {
  id: number;
  tipoProducto: string;
  descripcionProducto: string;
  unidadMedida: string;
  medida: number;
  precio: number;
  idEmpresa: number;
  idZona?: number;
  idItemsZonas?: Number;
  categoriaProductos: CategoriaProducto[]; // Ensure this matches the expected type
}

export interface ProductoAEnviar {
  idProducto: number; // o string, dependiendo de tus datos
  idZona: number; // o string
  cantidad: number;
  idProyecto: number;
  categoriaProductos?: any[];
}
