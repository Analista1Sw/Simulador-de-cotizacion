import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ProyectoService } from '../services/Proyectos.service';
import { ButtonModule } from 'primeng/button';
import { Toast, ToastModule } from 'primeng/toast';
import { JsonPipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalles-apto',
  standalone: true,
  templateUrl: './detalles-apto.component.html',
  styleUrls: ['./detalles-apto.component.css'],
  imports: [
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    JsonPipe, 
    RouterModule,
  ],
  providers: [MessageService],
})
export class DetallesAptoComponent implements OnInit {

  form!: FormGroup;
  proyectos: { label: string; value: number }[] = []; // Proyectos disponibles
  zonasDisponibles: { label: string; value: number }[] = [
    // Zonas definidas manualmente
    { label: 'Privadas y Sociales', value: 1 },
    { label: 'Baño', value: 2 },
    { label: 'Cocina', value: 3 },
    { label: 'Lavado', value: 4 },
  ];

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      proyecto: ['', Validators.required],
      tipoApartamento: ['', Validators.required],
      zonas: this.fb.array([]), // Inicializamos FormArray vacío
    });
  }

  ngOnInit(): void {
    this.cargarProyectos(); // Cargar proyectos disponibles
  }

  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe(
      (proyectos) => {
        this.proyectos = proyectos.map((proyecto) => ({
          label: proyecto.nombre,
          value: proyecto.id,
        }));
        console.log('Proyectos disponibles:', this.proyectos);
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

  // Obtener el FormArray de zonas
  get zonas() {
    return this.form.get('zonas') as FormArray;
  }

  // Agregar una nueva zona
  agregarZona() {
    const zonaFormGroup = this.fb.group({
      idZona: ['', Validators.required],
      muros: ['', Validators.required],
      pisos: ['', Validators.required],
      techo: ['', Validators.required],
    });
    this.zonas.push(zonaFormGroup);
  }

  // Eliminar una zona
  eliminarZona(index: number) {
    this.zonas.removeAt(index);
  }

  // Método de guardar (submit)
  onSubmit(): void {
    if (this.form.valid) {
      // Extrae solo el ID del proyecto (value)
      const proyectoId = this.form.value.proyecto?.value;  // Se obtiene el valor del proyecto (ID)
      const tipoApartamento = this.form.value.tipoApartamento;  // Nombre del apartamento
  
      const datosApartamento = {
        nombre: tipoApartamento,  // Nombre del apartamento
        medida: "80 m2",          // Medida fija
        proyecto: proyectoId      // Solo el ID del proyecto
      };
  
      console.log('Datos enviados:', datosApartamento);  // Imprime los datos antes de enviarlos
  
      this.proyectoService.createApartamento(datosApartamento).subscribe(
        (response) => {
          console.log('Apartamento creado exitosamente:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'El apartamento se guardó correctamente',
          });
          this.form.reset();
          setTimeout(() => this.router.navigate(['/preAlistamiento']), 800);
        },
        (error) => {
          console.error('Error al crear el apartamento:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo guardar el apartamento',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Por favor, completa todos los campos requeridos',
      });
    }
  }  
}  
