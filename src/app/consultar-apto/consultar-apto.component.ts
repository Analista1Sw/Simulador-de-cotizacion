import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    private proyectoService: ProyectoService 
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
      this.proyectos = data; 
    });
  }

  // Consultar apartamentos por el proyecto seleccionado
  consultarApartamentos() {
    const proyectoId = this.form.value.proyecto; // Obtener el ID del proyecto seleccionado
    if (proyectoId) {
      this.proyectoService
        .getApartamentosByProyecto(proyectoId)
        .subscribe((data: Apartamento[]) => {
          this.apartamentos = data; // Asigna los apartamentos a la variable
        });
    }
  }
}
