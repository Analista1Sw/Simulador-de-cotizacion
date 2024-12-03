export interface ResumenCotizacion {
    prospecto: {
        nombre: string;
        documento: string;
    };
    proyecto: {
        nombre: string;
        id: number;
    };
    productosZona1: Producto[];
    productosZona2: Producto[];
    accesorios: Producto[];
    totalCotizacion: number;
}


export interface Producto {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
}
