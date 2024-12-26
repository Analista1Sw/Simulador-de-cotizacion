

export interface ProductoAEnviar {
  idProducto: number;
  idZona: number;
  idItemsZonas: number; // Actualizado de idItemZona a idItemsZonas
  cantidad: number;
  idApartamento: number;
  idProspecto: number;
}


const productosAEnviar: ProductoAEnviar[] = [];

