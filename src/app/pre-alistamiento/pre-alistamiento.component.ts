import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Router  } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProyectoService } from '../services/Proyectos.service';

@Component({
  selector: 'app-pre-alistamiento',
  standalone: true,
  imports: [
    ToastModule,
    ButtonModule,
    RouterModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './pre-alistamiento.component.html',
  styleUrls: ['./pre-alistamiento.component.css'],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PreAlistamientoComponent {
  displayModal: boolean = false;
  isCreatingApartment: boolean = false;
  nombre: string = '';
  direccion: string = '';
  descripcion: string = '';
  nombreApartamento: string = '';
  medidaApartamento: number | null = null;

  zonas: Array<{ nombre: string; medida: number | null }> = [
    { nombre: 'Cocina', medida: null },
    { nombre: 'Baño', medida: null },
    { nombre: 'Habitación', medida: null },
  ];

  constructor(
    private messageService: MessageService,
    private proyectoService: ProyectoService,
    private router: Router 
  ) {}

  // Abrir el modal y definir si es proyecto o apartamento
  openModal(isApartment: boolean) {
    this.isCreatingApartment = isApartment;
    this.displayModal = true;
  }

  // Método que maneja el envío del formulario
  handleFormSubmit(form: NgForm) {
    if (form.valid) {
      const data = this.isCreatingApartment
        ? {
            nombre: this.nombreApartamento,
            medida: this.medidaApartamento,
            zonas: this.zonas,
          }
        : {
            nombre: this.nombre,
            direccion: this.direccion,
            descripcion: this.descripcion,
          };

      this.proyectoService.postProyecto(data).subscribe(
        (response) => {
          console.log('Creación exitosa:', response);
          this.clearForm();
          this.displayModal = false;
          this.messageService.add({
            severity: 'success',
            summary: this.isCreatingApartment
              ? 'Apartamento Creado'
              : 'Proyecto Creado',
            detail: `El ${this.isCreatingApartment ? 'apartamento' : 'proyecto'} ha sido creado exitosamente.`,
          });
        },
        (error) => {
          console.error('Error al crear:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Hubo un error al crear el ${this.isCreatingApartment ? 'apartamento' : 'proyecto'}.`,
          });
        }
      );
      form.reset(); 
    } else {
      console.log('Formulario no válido');
    }
  }
  goToDetallesApto() {
    this.router.navigate(['/crearApto']);

    
  }
  goToDetallesApto1() {
    this.router.navigate(['/lista']);

    
  }
  // Limpiar el formulario
  clearForm() {
    this.nombre = '';
    this.direccion = '';
    this.descripcion = '';
    this.nombreApartamento = '';
    this.medidaApartamento = null;
    this.zonas.forEach((zona) => (zona.medida = null));
  }
}
