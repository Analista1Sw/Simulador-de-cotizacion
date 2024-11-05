import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pre-alistamiento',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './pre-alistamiento.component.html',
  styleUrls: ['./pre-alistamiento.component.css'],
})
export class PreAlistamientoComponent {
  displayModal: boolean = false;
  modalType: string = '';

  tipoProyectoOptions = [
    { label: 'Residencial', value: 'residencial' },
    { label: 'Comercial', value: 'comercial' },
    { label: 'Industrial', value: 'industrial' },
  ];

  tipoApartamentoOptions = [
    { label: 'Residencial', value: 'residencial' },
    { label: 'Comercial', value: 'comercial' },
    { label: 'Industrial', value: 'industrial' },
  ];

  selectedTipoProyecto: string | null = null;
  selectedTipoApartamento: string | null = null;
  nombre: string = '';
  nombreProyecto: string = '';
  descripcion: string = '';

  openModal(type: string) {
    this.modalType = type;
    this.displayModal = true;
  }

  handleFormSubmit() {
    if (this.modalType === 'apartamento') {
      const formData = {
        nombre: this.nombre,
        descripcion: this.descripcion,
      };
      console.log('Datos del apartamento:', formData);
    } else {
      const formData = {
        nombreProyecto: this.nombreProyecto,
        tipoProyecto: this.selectedTipoProyecto,
      };
      console.log('Datos del proyecto:', formData);
    }

    // Redirigir a la página deseada
    window.location.href = '/preAlistamiento/apartamento'; 
  }
  clearForm() {
    // Limpia los campos del formulario
    this.nombre = '';
    this.nombreProyecto = '';
    this.descripcion = '';
    this.selectedTipoProyecto = null;
    this.selectedTipoApartamento = null;
  }
}
