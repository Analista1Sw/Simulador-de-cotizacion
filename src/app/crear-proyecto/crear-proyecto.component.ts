import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProyectoService } from '../services/Proyectos.service';  // Asegúrate de tener un servicio de Proyecto

@Component({
  selector: 'app-crear-proyecto',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    FormsModule,        // Asegúrate de importar FormsModule aquí
    InputTextModule,    // Asegúrate de importar InputTextModule aquí
  ],
  providers: [MessageService],
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css'],
})
export class CrearProyectoComponent {
  nombre: string = '';
  direccion: string = '';
  descripcion: string = '';
  displayModal: boolean = false;  // Para mostrar o no un modal, si es necesario

  constructor(
    private proyectoService: ProyectoService,  // Asegúrate de tener un servicio de Proyecto
    private messageService: MessageService
  ) {}

  // Método que maneja el envío del formulario para la creación de un proyecto
  handleFormSubmit(form: NgForm) {
    if (form.valid) {
      const projectData = {
        nombre: this.nombre,
        direccion: this.direccion,
        descripcion: this.descripcion,
      };

      this.proyectoService.postProyecto(projectData).subscribe(
        (response) => {
          console.log('Creación de proyecto exitosa:', response);
          this.clearForm();
          this.displayModal = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Proyecto Creado',
            detail: `El proyecto ha sido creado exitosamente.`,
          });
        },
        (error) => {
          console.error('Error al crear el proyecto:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al crear el proyecto.',
          });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para limpiar el formulario después de enviar los datos
  clearForm() {
    this.nombre = '';
    this.direccion = '';
    this.descripcion = '';
  }

  // Método para resetear el formulario en caso de cancelar
  resetForm(form: NgForm) {
    form.reset();
  }
}
