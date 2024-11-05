import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-crear-apto',
  standalone: true,
  imports: [TableModule, DropdownModule, FormsModule, CardModule, ButtonModule],
  templateUrl: './crear-apto.component.html',
  styleUrl: './crear-apto.component.css'
})
export class CrearAptoComponent  {
  materials = [
    { name: 'HABITACION PPAL', unit: 'M2', amount: 7.94, amount1: 7.94},
    { name: 'HABITACION AUX 1', unit: 'M2', amount: 6.91 },
    { name: 'HABITACION// ESTUDIO AUX 2', unit: 'M2', amount: 4.9 },
    { name: 'SALA COMEDOR', unit: 'M2', amount: 14.36 },
    { name: 'HALL DE HABITACIONES', unit: 'M2', amount: 2.48 },
  ];

  units = [
    { label: 'M2', value: 'M2' },
    { label: 'FT2', value: 'FT2' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
