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
  providers: [MessageService],
  styleUrls: ['./fidelizacion-cliente.component.css'],
})
export class FidelizacionClienteComponent implements OnInit {
  fidelizacionForm!: FormGroup;
  proyectos: any[] = [
    { id: 1, nombre: 'Proyecto A' },
    { id: 2, nombre: 'Proyecto B' },
  ];
  tiposApartamento: any[] = [];
  selectedRoom: string | null = null; // Agregar propiedad para la habitación seleccionada
  totalCost: number = 0; // Agregar propiedad para el costo total

  tiposPorProyecto: { [key: number]: { name: string; value: string }[] } = {
    1: [
      { name: 'Apartamento A1', value: 'a1' },
      { name: 'Apartamento A2', value: 'a2' },
    ],
    2: [
      { name: 'Apartamento B1', value: 'b1' },
      { name: 'Apartamento B2', value: 'b2' },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fidelizacionForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{9,10}$')],
      ],
      proyecto: [null, Validators.required],
      tipoApartamento: [{ value: null, disabled: true }, Validators.required],
    });
  }

  onProyectoChange(event: any) {
    const proyectoId = event.value ? event.value.id : null;
    if (proyectoId) {
      this.tiposApartamento = this.tiposPorProyecto[proyectoId] || [];
      this.fidelizacionForm.get('tipoApartamento')?.enable();
    } else {
      this.tiposApartamento = [];
      this.fidelizacionForm.get('tipoApartamento')?.disable();
    }
  }

  onSubmit() {
    if (this.fidelizacionForm.valid) {
      console.log(this.fidelizacionForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Formulario enviado correctamente',
      });
      setTimeout(() => {
        this.router.navigate(['/cotizar']);
      }, 800);
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
      // Navegación opcional
      // this.router.navigate(['/otra-ruta']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos correctamente.',
      });
    }
  }
}
