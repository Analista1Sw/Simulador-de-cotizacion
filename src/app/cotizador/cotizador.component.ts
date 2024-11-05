import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';

export interface MaterialesPorCategoria {
  muros: string[];
  pisos: string[];
  techos: string[];
  accesorios: { nombre: string; cantidad: number; categoria?: string }[];
  [key: string]: any;
}

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    ToastModule,
    DialogModule,
    TabViewModule,
  ],
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
  providers: [MessageService],
})
export class CotizadorComponent {
  displayModal: boolean = false;
  isQuoteReady: boolean = false;

  roomOptions = [
    { label: 'Cocina', value: 'cocina' },
    { label: 'Baño', value: 'baño' },
    { label: 'Sala', value: 'sala' },
  ];

  selectedRoom = '';

  selectedMaterials: { [key: string]: string } = {
    muro: '',
    piso: '',
    techo: '',
  };

  selectedRoomMaterials: MaterialesPorCategoria = {
    muros: [],
    pisos: [],
    techos: [],
    accesorios: [],
  };

  roomMaterials: Record<string, MaterialesPorCategoria> = {
    cocina: {
      muros: [
        'Suministro e instalacion de FRISO',
        'Suministro e instalacion de ESTUCO',
        'Suministro e instalacion de PINTURA BLANCA TP2',
        'Pared rectangular AVILA 34.8x60.5cm',
        'Pared ceramica lago bg 32x45',
        'Pared ceramica babu hd 32x45',
        'pared Ceramica blanco selecto 31x60 1a',
        'pared Ceramica sierra nevada bca 31x60 1a',
        'Salpicadero AVILA 34.8x60.5cm',
        'Salpicadero ceramica babu hd 32x45',
        'Salpicadero Ceramica blanco selecto 31x60 1a',
        'Salpicadero Ceramica sierra nevada bca 31x60 1a',
      ],
      pisos: [
        'piso malambo beige 51x51 1a',
        'piso san martin fd cp marfil 50x50 1a',
        'piso sahara hd blanco 50x50 1a',
        'piso gracia fd cp beige 60x60 1a',
        'piso pleno hd 61x61 1a',
        'piso san nicolas beige 51x51 1a',
        'piso trendy fd cp beige 50x50 1a',
        'piso marmol indala fd 60x60 beige 1a',
        'Guarda escoba malambo beige 51x51 1a',
        'Guarda escobasan martin fd cp marfil 50x50 1a',
        'Guarda escoba sahara hd blanco 50x50 1a',
        'Guarda escoba gracia fd cp beige 60x60 1a',
        'Guarda escoba pleno hd 61x61 1a',
        'Guarda escoba san nicolas beige 51x51 1a',
        'Guarda escoba trendy fd cp beige 50x50 1a',
        'Guarda escoba marmol indala fd 60x60 beige 1a',
      ],
      techos: [
        'Drywall para techo, acabado blanco',
        'Pintura TP 2 en techo',
        'Drywall RH para techo',
        'Cielo raso en PVC',
      ],
      accesorios: [
        {
          nombre: 'Mueble alto de cocina h 40 cm',
          cantidad: 1,
          categoria: 'Almacenamiento',
        },
        {
          nombre: 'Mueble bajo de cocina h 90 cm',
          cantidad: 1,
          categoria: 'Almacenamiento',
        },
        { nombre: 'Meson en granito', cantidad: 1, categoria: 'Accesorios' },
        {
          nombre: 'Lavaplados en acero inox',
          cantidad: 1,
          categoria: 'Aparatos',
        },
        {
          nombre: 'Estufa Esmaltada 60 cm CG4PSNSE N',
          cantidad: 1,
          categoria: 'Aparatos',
        },
        {
          nombre: 'Griferia Griferia Cocina Witi Acero',
          cantidad: 1,
          categoria: 'Aparatos',
        },
        {
          nombre: 'Griferia Cocina Veletri Inox',
          cantidad: 1,
          categoria: 'Aparatos',
        },
      ],
    },
    baño: {
      muros: ['Azulejos impermeables', 'Pintura antihumedad'],
      pisos: ['Mármol', 'Gres porcelánico'],
      techos: ['Techo de PVC', 'Pintura anti-moho'],
      accesorios: [
        { nombre: 'Espejo', cantidad: 1, categoria: 'Decoración' },
        { nombre: 'Portatoallas', cantidad: 1, categoria: 'Accesorios' },
      ],
    },
    sala: {
      muros: ['Papel tapiz', 'Pintura acrílica'],
      pisos: ['Parquet', 'Laminado'],
      techos: ['Pintura estándar', 'Falso techo decorativo'],
      accesorios: [
        { nombre: 'Lámpara de techo', cantidad: 1, categoria: 'Iluminación' },
        {
          nombre: 'Estante de pared',
          cantidad: 1,
          categoria: 'Almacenamiento',
        },
      ],
    },
  };

  searchText = '';

  selectedCategory = '';

  categoryOptions = [
    { label: 'Almacenamiento', value: 'Almacenamiento' },
    { label: 'Iluminación', value: 'Iluminación' },
    { label: 'Aparatos', value: 'Aparatos' },
  ];

  constructor(private router: Router) {} // Inyecta Router

  updateMaterials() {
    this.selectedRoomMaterials = this.roomMaterials[this.selectedRoom] ?? {
      muros: [],
      pisos: [],
      techos: [],
      accesorios: [],
    };
    this.checkIsQuoteReady(); // Verificar si el botón debe habilitarse
  }

  filteredAccessories() {
    return this.selectedRoomMaterials.accesorios.filter((accesorio) => {
      const matchesSearch = accesorio.nombre
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
      const matchesCategory =
        !this.selectedCategory || accesorio.categoria === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  incrementQuantity(accesorio: { cantidad: number }) {
    accesorio.cantidad += 1;
    this.checkIsQuoteReady(); // Llama a checkIsQuoteReady después de cambiar la cantidad
  }

  decrementQuantity(accesorio: { cantidad: number }) {
    if (accesorio.cantidad > 1) {
      accesorio.cantidad -= 1;
      this.checkIsQuoteReady(); // Llama a checkIsQuoteReady después de cambiar la cantidad
    }
  }

  checkIsQuoteReady() {
    const allMaterialsSelected = Object.values(this.selectedMaterials).every(
      (material) => material !== ''
    );
    const accessoriesSelected = this.selectedRoomMaterials.accesorios.every(
      (accesorio) => accesorio.cantidad > 0
    );
    this.isQuoteReady =
      !!this.selectedRoom && allMaterialsSelected && accessoriesSelected;
  }

  confirmQuote() {
    this.displayModal = true; // Abre el modal cuando se hace clic en el botón
  }

  proceedWithQuote() {
    this.displayModal = false; // Oculta el modal
    this.router.navigate(['/resumen']);
  }

  cancelQuote() {
    this.displayModal = false;
  }

  downloadPDF() {
    // Lógica para descargar el PDF
  }
}
