import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css',
  providers: [MessageService],
})
export class PruebaComponent {
  fidelizacionForm!: FormGroup;
  tiposApartamento: any[];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    // Opciones de tipos de apartamento
    this.tiposApartamento = [
      { name: 'Apartamento Estudio', value: 'estudio' },
      { name: 'Apartamento de Una Habitación', value: 'una_habitacion' },
      { name: 'Apartamento de Dos Habitaciones', value: 'dos_habitaciones' },
      { name: 'Apartamento de Tres Habitaciones', value: 'tres_habitaciones' },
    ];
  }

  ngOnInit() {
    // this.fidelizacionForm = this.fb.group({
    //   nombre: ['', [Validators.required, Validators.minLength(3)]],
    //   email: ['', [Validators.required, Validators.email]],
    //   telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
    //   tipoApartamento: [null, Validators.required], 
    // });
  }

  onSubmit() {
    if (this.fidelizacionForm.valid) {
      console.log(this.fidelizacionForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Formulario enviado correctamente',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos correctamente',
      });
    }
  }

}
