import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProyectoService } from '../services/Proyectos.service';
import { Apartamento } from '../interfaces/Proyecto';

@Component({
  selector: 'app-consultar-apto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './consultar-apto.component.html',
  styleUrls: ['./consultar-apto.component.css'],
})
export class ConsultarAptoComponent {
  // Definir el formulario para el proyecto seleccionado
  form: FormGroup;
  proyectos: any[] = []; 
  apartamentos: Apartamento[] = []; 

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private router: Router
  ) {
    // Inicializa el formulario
    this.form = this.fb.group({
      proyecto: [null, Validators.required], 
    });
  }

  ngOnInit() {
    this.getProyectos(); 
  }

  // Obtener la lista de proyectos 
  getProyectos() {
    this.proyectoService.getProyectos().subscribe((data: any[]) => {
      this.proyectos = data.map((proyecto) => ({
        id: proyecto.id,
        nombre: proyecto.nombre, // Ajusta según el campo que quieras usar como etiqueta
      }));
    });
  }

  // Consultar apartamentos por el proyecto seleccionado
  consultarApartamentos() {
    const proyectoId = Number(this.form.value.proyecto); // Convierte el valor a número
    if (proyectoId) {
      this.proyectoService
        .getApartamentosByProyecto(proyectoId)
        .subscribe(
          (data: Apartamento[]) => {
            this.apartamentos = data; // Asigna los apartamentos a la variable
          },
          (error) => {
            console.error('Error al obtener apartamentos:', error);
          }
        );
    } else {
      console.warn('ID del proyecto no válido:', proyectoId);
    }
  }

  navigateBack() {
    this.router.navigate(['/preAlistamiento']);
  }
  
}
