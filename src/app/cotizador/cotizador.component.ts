import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { CotizacionService } from '../services/cotizacion.service';
import { MySharedServiceService } from '../shared/my-shared-service.service';
import {
  MaterialesPorCategoria,
  ProductoAEnviar,
  Producto,
  DetalleCotizacion,
} from '../interfaces/MaterialesPorCategoria';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    TabViewModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    TableModule,
    InputNumberModule,
  ],
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
  providers: [MessageService],
})
export class CotizadorComponent {
  form2: FormGroup;
  displayModal: boolean = false;

  // Aquí, los productos ya contienen `idItemsZonas` enviados por el backend.
  materialesMuro: Producto[] = []; // Cargados desde el backend
  materialesPiso: Producto[] = []; // Cargados desde el backend
  materialesTecho: Producto[] = []; // Cargados desde el backend
  materialesGuardaEscoba: Producto[] = [];
  materialesCabina: Producto[] = [];
  materialesSalpicadero: Producto[] = [];
  redElectrica: Producto[] = [];
  accesorios: Producto[] = [];

  selectedMaterialMuroHabitacion: Producto | null = null;
  selectedMaterialPisoHabitacion: Producto | null = null;
  selectedMaterialTechoHabitacion: Producto | null = null;
  selectedMaterialGuardaEscoba: Producto | null = null;
  selectedMaterialMuroBa: Producto | null = null;
  selectedMaterialPisoBa: Producto | null = null;
  selectedMaterialTechoBa: Producto | null = null;
  selectedCabina: Producto | null = null;
  selectedMaterialMuroCocina: Producto | null = null;
  selectedMaterialPisoCocina: Producto | null = null;
  selectedMaterialTechoCocina: Producto | null = null;
  selectedMaterialSalpicadero: Producto | null = null;
  selectedMaterialMuroLavado: Producto | null = null;
  selectedMaterialPisoLavado: Producto | null = null;
  selectedMaterialTechoLavado: Producto | null = null;
  selectedMaterialGuardaEscobaLavado: Producto | null = null;
  selectedMaterialSalpicaderoLavado: Producto | null = null;

  allMateriales: Array<{
    id: number;
    zona: string;
    categoria: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    idItemsZonas: number;
  }> = [];

  constructor(
    private router: Router,
    private cotizacionService: CotizacionService,
    private messageService: MessageService,
    private mySharedServiceService: MySharedServiceService
  ) {
    this.form2 = new FormGroup({
      zona: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadMateriales();
    const idApartamento = this.mySharedServiceService.getIdApartamento();
    const idProspecto = this.mySharedServiceService.getProspectoId();

    console.log(
      idApartamento !== null
        ? 'ID Apartamento:' + idApartamento
        : 'ID Apartamento no disponible'
    );
    console.log(
      idProspecto !== null
        ? 'ID de Prospecto:' + idProspecto
        : 'ID de Prospecto no disponible'
    );
  }

  // Método para cargar materiales desde el backend
  loadMateriales(): void {
    this.cotizacionService.getMaterialesByZona('1').subscribe(
      (materiales: MaterialesPorCategoria) => {
        console.log('Respuesta completa del backend:', materiales);
        console.log('Cabinas:', materiales.cabinas);
        console.log(
          'Carpintería Habitaciones (antes de mapear):',
          materiales.accesorios
        );

        this.materialesMuro = materiales.muros.map((muro) => ({
          ...muro,
          idItemsZonas: 1, // Asignar el idItemsZonas de la zona "Muro"
        }));
        this.materialesPiso = materiales.pisos.map((piso) => ({
          ...piso,
          idItemsZonas: 2, // Asignar el idItemsZonas de la zona "Piso"
        }));
        this.materialesTecho = materiales.techos.map((techo) => ({
          ...techo,
          idItemsZonas: 3, // Asignar el idItemsZonas de la zona "Techo"
        }));
        this.materialesGuardaEscoba = materiales.guardaescoba.map(
          (guardaEscoba) => ({
            ...guardaEscoba,
            idItemsZonas: 12, // Asignar el idItemsZonas de la zona "guarda escoba"
          })
        );
        this.materialesSalpicadero = materiales.salpicadero.map(
          (Salpicadero) => ({
            ...Salpicadero,
            idItemsZonas: 11, // Asignar el idItemsZonas de la zona "salpicadero"
          })
        );
        this.materialesCabina = materiales.cabinas.map((Cabinas) => ({
          ...Cabinas,
          idItemsZonas: 13, // Asignar el idItemsZonas de la zona "Cabinas"
        }));

        this.accesorios = materiales.accesorios
          .map((accesorio) => ({
            ...accesorio,
            idItemsZonas: 6, // Asignar el idItemsZonas de la zona "Carpintería Habitaciones"
          }))

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

  isProducto(material: any): material is Producto {
    return material && material.id !== undefined; // Verifica que el objeto tiene la propiedad `id`
  }

  submitAllZonesQuote() {
    const idProspecto = this.mySharedServiceService.getProspectoId();
    if (!idProspecto) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de prospecto no encontrado.',
      });
      return;
    }

    const idApartamento = this.mySharedServiceService.getIdApartamento();
    if (!idApartamento) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de apartamento no encontrado.',
      });
      return;
    }

    const detalles: DetalleCotizacion[] = [];

    const materialesPorZona = [
      {
        zonaId: 1, // ID para "Privadas y Sociales"
        materiales: [
          this.selectedMaterialMuroHabitacion,
          this.selectedMaterialPisoHabitacion,
          this.selectedMaterialTechoHabitacion,
          this.selectedMaterialGuardaEscoba,
        ].filter((material) => material !== null),
      },
      {
        zonaId: 2, // ID para "Baños"
        materiales: [
          this.selectedMaterialMuroBa,
          this.selectedMaterialPisoBa,
          this.selectedMaterialTechoBa,
          this.selectedCabina,
        ].filter((material) => material !== null),
      },
      {
        zonaId: 3, // ID para "cocina"
        materiales: [
          this.selectedMaterialMuroCocina,
          this.selectedMaterialPisoCocina,
          this.selectedMaterialTechoCocina,
          this.selectedMaterialSalpicadero,
        ].filter((material) => material !== null),
      },
      {
        zonaId: 4, // ID para "lavado"
        materiales: [
          this.selectedMaterialMuroLavado,
          this.selectedMaterialPisoLavado,
          this.selectedMaterialTechoLavado,
          this.selectedMaterialGuardaEscobaLavado,
          this.selectedMaterialSalpicaderoLavado,
        ].filter((material) => material !== null),
      },
      {
        zonaId: 5, // ID para "accesorios"
        materiales: [
          this.selectedMaterialMuroLavado,
          this.selectedMaterialPisoLavado,
          this.selectedMaterialTechoLavado,
          this.selectedMaterialGuardaEscobaLavado,
          this.selectedMaterialSalpicaderoLavado,
        ].filter((material) => material !== null),
      },
      // Agregar más zonas si es necesario
    ];

    materialesPorZona.forEach((zona) => {
      zona.materiales.forEach((material) => {
        if (this.isProducto(material)) {
          detalles.push({
            idProducto: material.id,
            idZona: zona.zonaId,
            idItemsZonas: Number(material.idItemsZonas) || 0,
            cantidad: material.cantidad || 1,
            idApartamento,
          });
        } else {
          console.error('Material no es un objeto Producto:', material);
        }
      });
    });

    const productosAEnviar = {
      idProspecto, // Asegúrate de incluir el idProspecto aquí
      detalles, // Aquí van los detalles con los productos
    };

    console.log('Datos que se enviarán al backend:', productosAEnviar);

    this.cotizacionService
      .sendAllQuotes(idProspecto, productosAEnviar.detalles)
      .subscribe(
        (response) => {
          console.log('Respuesta del backend:', response); // Verifica la respuesta completa
          const idCotizacion = response; // El backend está devolviendo el ID directamente como un número

          if (idCotizacion) {
            console.log('Redirigiendo a resumen con ID:', idCotizacion);
            this.router.navigateByUrl(`/resumen/${idCotizacion}`); // Navega a la vista resumen
          } else {
            console.error('ID de cotización no recibido. Respuesta:', response);
          }
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

  showConfirmationDialog() {
    this.displayModal = true;
  }

  proceedWithQuote() {
    this.displayModal = false; // Cierra el modal antes de proceder
    this.submitAllZonesQuote(); // Llama al método para enviar la cotización
  }

  cancelQuote() {
    this.displayModal = false;
  }
}
