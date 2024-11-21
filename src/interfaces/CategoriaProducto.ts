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
    categoriaProductos: CategoriaProducto[]; // Ensure this matches the expected type
  }
  