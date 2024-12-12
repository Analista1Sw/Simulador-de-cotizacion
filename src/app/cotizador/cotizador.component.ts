import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { CotizacionService } from '../services/cotizacion.service';
import { MaterialesPorCategoria } from '../interfaces/MaterialesPorCategoria';
import { Producto } from '../interfaces/MaterialesPorCategoria';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    ToastModule,
    InputTextModule, TableModule, InputNumberModule
  ],
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
  providers: [MessageService],
})
export class CotizadorComponent {
  form2: FormGroup;
  displayModal: boolean = false; // Controla la visibilidad del modal
  materialesMuro: Producto[] = [];
  materialesPiso: Producto[] = [];
  materialesTecho: Producto[] = [];
  // materialesZocalo: Producto[] = [];
  // materialesAparatos: Producto[] = [];
  materialesGuardaEscoba: Producto[] = [];

  selectedMaterialMuroHabitacion: Producto | null = null;
  selectedMaterialPisoHabitacion: Producto | null = null;
  selectedMaterialTechoHabitacion: Producto | null = null;
  selectedMaterialMuroBa: Producto | null = null;
  selectedMaterialPisoBa: Producto | null = null;
  selectedMaterialTechoBa: Producto | null = null;
  selectedMaterialMuroCocina: string | null = null;
  selectedMaterialPisoCocina: string | null = null;
  selectedMaterialTechoCocina: string | null = null;
  selectedGuardaEscoba: string | null = null;

   // Variables para la sección de Instalaciones y Equipos
   materialesCarpinteria = [
    { descripcion: 'Puertas', cantidad: 1 },
    { descripcion: 'Ventanas', cantidad: 1 }
  ];

  materialesAparatos = [
    { descripcion: 'Aire Acondicionado', cantidad: 1 },
    { descripcion: 'Luz', cantidad: 1 }
  ];

  materialesAccesorios = [
    { descripcion: 'Tuberías', cantidad: 1 },
    { descripcion: 'Conectores', cantidad: 1 }
  ];

  materialesRedElectrica = [
    { descripcion: 'Cableado', cantidad: 1 },
    { descripcion: 'Conectores', cantidad: 1 }
  ];


  constructor(
    private router: Router,
    private cotizacionService: CotizacionService,
    private messageService: MessageService
  ) {
    this.form2 = new FormGroup({
      zona: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadMateriales();
  }

  loadMateriales(): void {
    this.cotizacionService.getMaterialesByZona('1').subscribe(
      (materiales: MaterialesPorCategoria) => {
        console.log(materiales); // Verifica la estructura de los datos
        this.materialesMuro = materiales.muros;
        this.materialesPiso = materiales.pisos;
        this.materialesTecho = materiales.techos;
        // this.materialesZocalo = materiales.accesorios.filter((m) =>
        //   m.categoria.includes('Zócalo')
        // );
       
      },
      (error) => {
        console.error('Error al cargar materiales:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los materiales.',
        });
      }
    );
  }

  submitAllZonesQuote() {
    const materialesSeleccionados = [
      this.selectedMaterialMuroHabitacion,
      this.selectedMaterialPisoHabitacion,
      this.selectedMaterialTechoHabitacion,
      this.selectedMaterialMuroBa,
      this.selectedMaterialPisoBa,
      this.selectedMaterialTechoBa,
    ].filter((material) => material !== null);
  
    const productosAEnviar = materialesSeleccionados.map((material) => ({
      idProducto: material!.id,
      idZona: 1, // Id de zona, según la lógica de tu backend
      cantidad: 1, // Cantidad predeterminada
    }));
  
    const idProspecto = 10;
  
    this.cotizacionService.sendAllQuotes(idProspecto, productosAEnviar).subscribe(
      (response) => {
        const idCotizacion = response.idCotizacion; // Asegúrate de que el backend devuelva este ID
        console.log('ID de cotización recibido:', idCotizacion);
  
        // Almacenar el idCotizacion para redirigir
        this.router.navigate(['/resumen', idCotizacion]);  // Redirige a la vista de resumen pasando el idCotizacion
      },
      (error) => {
        console.error('Error al enviar materiales:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron enviar los materiales.',
        });
      }
    );
  }
  
  // Muestra el modal cuando se hace clic en "Generar Cotización"
  showConfirmationDialog() {
    this.displayModal = true;
  }
  // Acción cuando se confirma la cotización
  proceedWithQuote() {
    // Mostrar el toast de éxito
    this.messageService.add({
      severity: 'success',
      summary: 'Cotización Generada',
      detail: 'La cotización se ha generado correctamente.',
    });
    // Redirigir a la página de resumen
    this.router.navigate(['/resumen']); 
    this.displayModal = false; 
  }
  // Acción cuando se cancela la cotización
  cancelQuote() {
    this.displayModal = false; 
  }
}