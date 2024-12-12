export interface Product{
  id?: number,
  tipoProducto: string;
  descripcionProducto: string;
  precio: number;
  idEmpresa: number;
  unidadMedida: String;
  medida: number;
  idZona?: number;
  categoriaProductos: CategoriaProducto[];
}

export interface CategoriaProducto {
  id: number;
  tipoCategoria: string;
  descripcionCategoria: string;
}
