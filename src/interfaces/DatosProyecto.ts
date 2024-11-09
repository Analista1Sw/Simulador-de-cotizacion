export interface Proyecto {
    id: number;
    nombre: string;
  }
  
  export interface Apartamento {
    id: number;
    nombre: string;
    medida: string;
    proyecto: Proyecto;
  }
  
  export interface DatosProyecto {
    id: number;
    nombre: string;
    telefono: string;
    correo: string;
    documento: string;
    apartamentoId: Apartamento;
  }
  