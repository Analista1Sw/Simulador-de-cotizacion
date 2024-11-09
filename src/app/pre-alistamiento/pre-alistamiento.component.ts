import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
  displayModal: boolean = false; // Nueva propiedad para controlar la visibilidad
  constructor(private messageService: MessageService) {}


  nombre: string = '';
  direccion: string = '';
  ciudadPais: string = '';
  tipoApartamentoOptions = [
    { label: 'Tipo A', value: 'tipoA' },
    { label: 'Tipo B', value: 'tipoB' },
    { label: 'Tipo C', value: 'tipoC' },
  ];
  selectedTipoApartamento: string = '';
  tamano: number | null = null;
  numeroHabitaciones: number | null = null;
  numeroBanos: number | null = null;
  estadoActual: string = '';
  anioConstruccion: number | null = null;

  // Método para mostrar el formulario y ocultar la sección introductoria
  openModal() {
    this.displayModal = true;
  }

  handleFormSubmit(form: NgForm) {
    if (form.valid) {
      console.log({
        nombre: this.nombre,
        direccion: this.direccion,
        ciudadPais: this.ciudadPais,
        tipoApartamento: this.selectedTipoApartamento,
        tamano: this.tamano,
        numeroHabitaciones: this.numeroHabitaciones,
        numeroBanos: this.numeroBanos,
        estadoActual: this.estadoActual,
        anioConstruccion: this.anioConstruccion,
      });
      this.clearForm();
      this.displayModal = false; 
      this.messageService.add({
        severity: 'success',
        summary: 'Proyecto Creado',
        detail: 'El proyecto ha sido creado exitosamente.',
      });
    } else {
      // Manejo de errores de validación
      console.log('Formulario no válido');
    }
  }
  clearForm() {
    this.nombre = '';
    this.direccion = '';
    this.ciudadPais = '';
    this.selectedTipoApartamento = '';
    this.tamano = null;
    this.numeroHabitaciones = null;
    this.numeroBanos = null;
    this.estadoActual = '';
    this.anioConstruccion = null;
  }
}
