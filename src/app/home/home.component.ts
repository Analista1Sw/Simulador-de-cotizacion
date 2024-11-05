import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { DropdownModule } from 'primeng/dropdown';
interface Material {
  name: string;
  price: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,DropdownModule], // Sólo necesitas ReactiveFormsModule aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  zones = ['Cocina', 'Baño', 'Sala', 'Dormitorio'];
  materials: Material[] = [
    { name: 'Cemento', price: 100 },
    { name: 'Ladrillo', price: 50 },
    { name: 'Pintura', price: 30 },
    { name: 'Madera', price: 80 },
  ];
  selectedMaterials: Material[] = [];
  totalCost = 0;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      zone: [''],
      material: [''],
      quantity: [1],
    });
  }

  addMaterial() {
    const material = this.form.value.material;
    const quantity = this.form.value.quantity;

    const selectedMaterial = this.materials.find(m => m.name === material);
    if (selectedMaterial) {
      this.selectedMaterials.push(selectedMaterial);
      this.totalCost += selectedMaterial.price * quantity;
      this.form.reset({ quantity: 1 });
    }
  }
}
