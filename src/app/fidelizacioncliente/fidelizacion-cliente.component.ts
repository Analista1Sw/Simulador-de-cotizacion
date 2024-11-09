import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { DatosProyecto } from '../../interfaces/DatosProyecto';
import { ProyectoService } from '../../services/DatosProyecto.service';

@Component({
  selector: 'app-fidelizacion-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule,
  ],
  templateUrl: './fidelizacion-cliente.component.html',
  providers: [MessageService, ProyectoService],
  styleUrls: ['./fidelizacion-cliente.component.css'],
})
export class FidelizacionClienteComponent implements OnInit {
  fidelizacionForm!: FormGroup;
  proyectos: any[] = [];
  tiposApartamento: any[] = [];
  selectedRoom: string | null = null; // Agregar propiedad para la habitación seleccionada
  totalCost: number = 0; // Agregar propiedad para el costo total



  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private proyectoService: ProyectoService
  ) {}

  ngOnInit() {
    this.fidelizacionForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{9,10}$')],
      ],
      proyecto: [null, Validators.required],
      apartamentoId: [{ value: null, disabled: true }, Validators.required],
    });

    // Cargar proyectos al iniciar
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.proyectoService.getProyectos().subscribe({
      next: (proyectos) => {
        console.log('Proyectos recibidos:', proyectos); 
        this.proyectos = proyectos;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar proyectos'
        });
      },
    });
  }

  onProyectoChange(event: any) {
    const proyectoId = event.value ? event.value.id : null;
    if (proyectoId) {
        this.proyectoService.getTiposApartamento(proyectoId).subscribe({
          next: (tipos) => {
            console.log('Tipos apartamento:', tipos); 
            // Asegúrate de que el mapeo esté correcto
            this.tiposApartamento = tipos.map(tipo => ({
              label: tipo.nombre, // Lo que se mostrará en el dropdown
              value: tipo.id      // El valor que se usará internamente
            }));
            this.fidelizacionForm.get('apartamentoId')?.enable();
          },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar tipos de apartamentos',
                });
            },
        });
    } else {
        this.tiposApartamento = [];
        this.fidelizacionForm.get('apartamentoId')?.disable();
    }
}

  onSubmit() {
    if (this.fidelizacionForm.valid) {
      this.proyectoService 
        .postProyecto(this.fidelizacionForm.value)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Formulario enviado correctamente',
            });
            setTimeout(() => this.router.navigate(['/cotizar']), 800);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al enviar el formulario',
            });
          },
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos correctamente',
      });
    }
  }

  // Método para verificar si el formulario es válido
  isFormValid(): boolean {
    return this.fidelizacionForm.valid; // Devuelve true si el formulario es válido
  }

  // Método para confirmar la cotización
  confirmQuote() {
    if (this.fidelizacionForm.valid) {
      console.log('Cotización generada:', this.fidelizacionForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Cotización Generada',
        detail: 'La cotización se ha generado correctamente.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos correctamente.',
      });
    }
  }
}
