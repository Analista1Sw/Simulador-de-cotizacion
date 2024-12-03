import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ProyectoService } from '../services/Proyectos.service';
import { ButtonModule } from 'primeng/button';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      proyecto: ['', Validators.required],
      tipoApartamento: ['', Validators.required],
      zonas: this.fb.array([]), // Inicializamos FormArray vacío
    });
  }

  ngOnInit(): void {
    this.cargarProyectos(); // Cargar proyectos (si es necesario)
  }

  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe(
      (proyectos) => {
        this.proyectos = proyectos.map((proyecto) => ({
          label: proyecto.nombre,
          value: proyecto.id,
        }));
        console.log('Proyectos disponibles:', this.proyectos); // Para verificar los proyectos
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

  // Obtener el FormArray
  get zonas() {
    return this.form.get('zonas') as FormArray;
  }

  // Agregar una nueva zona al FormArray
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

  // Método de submit
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Mostrar el toast de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: 'El apartamento ha sido guardado correctamente',
      });
    } else {
      console.log('Formulario no válido');
      // Mostrar el toast de error
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El formulario no es válido',
      });
    }
  }
}
