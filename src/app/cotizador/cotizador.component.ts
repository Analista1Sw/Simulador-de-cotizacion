import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { CotizacionService } from '../../services/cotizacion.service';
import { MaterialesPorCategoria } from '../../interfaces/MaterialesPorCategoria';
import { Zona } from '../../interfaces/MaterialesPorCategoria';

import { ProductoAEnviar } from '../../interfaces/MaterialesPorCategoria';
import { Producto } from '../../interfaces/MaterialesPorCategoria';
import { Cotizacion } from '../../interfaces/Cotizacion';

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
  form2: FormGroup;
  displayModal = false;
  isQuoteReady = true; // Button is always enabled
  zonas: Zona[] = [];
  selectedZona?: Zona;
  selectedRoom = '';
  searchText = '';
  selectedCategory = '';
  productosFiltrados: Producto[] = [];

  selectedMaterialsByZone: { [zone: string]: { [key: string]: string } } = {};

  selectedRoomMaterials: MaterialesPorCategoria = {
    muros: [],
    pisos: [],
    techos: [],
    accesorios: [],
  };

  categoryOptions = [
    { label: 'Almacenamiento', value: 'Almacenamiento' },
    { label: 'Iluminación', value: 'Iluminación' },
    { label: 'Aparatos', value: 'Aparatos' },
  ];

  constructor(
    private router: Router,
    private cotizacionService: CotizacionService,
    private messageService: MessageService
  ) {
    this.form2 = new FormGroup({
      zona: new FormControl(null, Validators.required),
      muro: new FormControl(null),
      piso: new FormControl(null),
      techo: new FormControl(null),
      accesorios: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.loadZonas();
  }

  loadZonas() {
    this.cotizacionService.getZonas().subscribe(
      (zonas: any[]) => {
        this.zonas = zonas.map((zona) => ({
          id: zona.id,
          nombre: zona.itemsZonas?.zonas?.nombre?.trim() || 'Sin Nombre',
        }));
      },
      (error: any) => {
        console.error('Error al cargar zonas:', error);
      }
    );
  }

  onZonaChange(): void {
    const selectedZone = this.form2.controls['zona'].value;

    if (selectedZone) {
      this.cotizacionService.getMaterialesByZona(selectedZone.id).subscribe(
        (materiales: MaterialesPorCategoria) => {
          this.selectedRoomMaterials = materiales;
          console.log('Materiales cargados:', materiales);
        },
        (error) => {
          console.error('Error al cargar materiales:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'No se pudieron cargar los materiales para la zona seleccionada.',
          });
        }
      );
    }
  }

  cargarProductosPorCategoria(tipoCategoria: string): void {
    this.cotizacionService.getProductosByCategoria(tipoCategoria).subscribe(
      (productos: Producto[]) => {
        this.productosFiltrados = productos;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos.',
        });
      }
    );
  }

  onCategoryChange(): void {
    const selectedCategory = this.selectedCategory;
    if (selectedCategory) {
      this.cargarProductosPorCategoria(selectedCategory);
    }
  }

  filteredAccessories() {
    if (Array.isArray(this.selectedRoomMaterials.accesorios)) {
      return this.selectedRoomMaterials.accesorios.filter((accesorio) => {
        const nombreAccesorio = accesorio.nombre
          ? accesorio.nombre.toLowerCase()
          : '';
        const searchText = this.searchText ? this.searchText.toLowerCase() : '';
        const matchesSearch = nombreAccesorio.includes(searchText);

        return matchesSearch;
      });
    }
    return [];
  }

  incrementQuantity(accesorio: { cantidad: number }) {
    accesorio.cantidad += 1;
  }

  decrementQuantity(accesorio: { cantidad: number }) {
    if (accesorio.cantidad > 1) {
      accesorio.cantidad -= 1;
    }
  }

  submitAllZonesQuote() {
    if (!this.selectedRoomMaterials) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Sin datos',
        detail: 'No hay materiales seleccionados para enviar.',
      });
      return;
    }
  
    const productosAEnviar: ProductoAEnviar[] = [];
  
    // Mapea los materiales seleccionados a ProductoAEnviar
    Object.keys(this.selectedRoomMaterials).forEach((category) => {
      const materiales = this.selectedRoomMaterials[category as keyof MaterialesPorCategoria];
  
      materiales.forEach((material) => {
        if (material.cantidad) {
          productosAEnviar.push({
            idProducto: material.id,
            idZona: this.selectedZona?.id ?? 0,
            cantidad: material.cantidad,
            idProyecto: 1, // Asumiendo 1 como ID de proyecto por defecto
          });
        }
      });
    });
  
    // Mapea ProductoAEnviar a Producto
    const productosParaEnviar: Producto[] = productosAEnviar.map((item) => ({
      id: item.idProducto,
      tipoProducto: '', // Asigna con los datos reales, si están disponibles
      descripcionProducto: '', // Asigna con los datos reales, si están disponibles
      unidadMedida: '', // Asigna con los datos reales, si están disponibles
      medida: 0, // Asigna con los datos reales, si están disponibles
      precio: 0, // Asigna con los datos reales, si están disponibles
      idEmpresa: 1, // Asigna un valor apropiado
      categoriaProductos: item.categoriaProductos || [] // Aquí, asigna las categorías obtenidas de algún lado
    }));
    
  
    // Envía los datos transformados al backend
    this.cotizacionService.sendAllQuotes(productosParaEnviar).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Cotización enviada',
          detail: 'Los datos de la cotización se enviaron correctamente.',
        });
        this.resetForm();
      },
      (error) => {
        console.error('Error al enviar la cotización:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo enviar la cotización.',
        });
      }
    );
  }
  

  resetForm() {
    this.form2.reset();
    this.selectedMaterialsByZone = {};
    this.selectedRoomMaterials = {
      muros: [],
      pisos: [],
      techos: [],
      accesorios: [],
    };
    this.selectedZona = undefined;
    this.isQuoteReady = false;
  }

  confirmQuote() {
    this.displayModal = true;
  }

  proceedWithQuote() {
    this.displayModal = false;

    const cotizacion: Cotizacion = {
      cotizacionId: Math.floor(Math.random() * 100000), // Generar un ID ficticio
      cliente: 'Juan Pérez', // Cambia esto por datos reales del cliente
      proyecto: 'Remodelación Casa', // Cambia esto según el proyecto seleccionado
      materiales: this.selectedRoomMaterials,
    };

    console.log('Cotización generada:', cotizacion);

    this.router.navigate(['resumen/'], {
      state: { data: cotizacion },
    });
  }

  cancelQuote() {
    this.displayModal = false;
  }

  downloadPDF() {
    // Lógica para descargar el PDF
  }
}
