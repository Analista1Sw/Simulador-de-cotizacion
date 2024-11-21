export interface Product{
  id?: number,
  tipoProducto: string;
  precio: number;
  unidadMedida: string;
  medida: number;
  categoriaProductos: CategoriaProducto[];
}

export interface CategoriaProducto {
  id: number;
  tipoCategoria: string;
  descripcionCategoria: string;
}
