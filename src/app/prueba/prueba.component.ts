import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css',
})
export class PruebaComponent implements OnInit {
  form: FormGroup;

  // Zonas y ítems predefinidos
  zonas = ['Privadas', 'Sociales', 'Baño', 'Cocina', 'Lavado'];
  itemsZonas = ['Muros', 'Pisos', 'Techos', 'Salpicadero', 'Guarda Escoba'];

  // Productos clasificados por ítem de zona
  productosPorZona: { [key: string]: { id: number; nombre: string }[] } = {
    'Muros': [],
    'Pisos': [],
    'Techos': [],
    'Salpicadero': [],
    'Guarda Escoba': []
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      zonas: this.fb.array([]) // FormArray para manejar las zonas dinámicamente
    });
  }

  ngOnInit() {
    // Obtener los productos del backend
    this.http.get<any[]>('http://200.122.250.66:9095/hefesto/producto/FindAll').subscribe(products => {
      this.organizarProductosPorZona(products);
    });

    // Inicializar zonas e ítems
    this.zonas.forEach(zona => this.agregarZona(zona));
  }

  // Getter para el FormArray de zonas
  get zonasFormArray(): FormArray {
    return this.form.get('zonas') as FormArray;
  }

  // Método para agregar una zona con sus ítems
  agregarZona(nombreZona: string) {
    const zonaGroup = this.fb.group({
      nombreZona: [nombreZona, Validators.required],
      items: this.fb.array([]) // FormArray para los ítems de la zona
    });

    // Agregar ítems de zona por defecto
    this.itemsZonas.forEach(item => this.agregarItem(zonaGroup, item));

    this.zonasFormArray.push(zonaGroup);
  }

  // Método para agregar un ítem a una zona específica
  agregarItem(zonaGroup: FormGroup, nombreItem: string) {
    const itemGroup = this.fb.group({
      nombreItem: [nombreItem, Validators.required],
      idProducto: [null, Validators.required] // Producto asociado al ítem
    });

    const itemsArray = zonaGroup.get('items') as FormArray;
    itemsArray.push(itemGroup);
  }

  // Organizar los productos por tipo de categoría
  organizarProductosPorZona(products: any[]) {
    products.forEach(product => {
      const categoria = product.categoriaProductos.tipoCategoria;

      if (categoria === 'ACABADO MUROS') {
        this.productosPorZona['Muros'].push({ id: product.id, nombre: product.tipoProducto });
      } else if (categoria === 'ACABADO PISOS') {
        this.productosPorZona['Pisos'].push({ id: product.id, nombre: product.tipoProducto });
      } else if (categoria === 'ACABADO TECHOS') {
        this.productosPorZona['Techos'].push({ id: product.id, nombre: product.tipoProducto });
      } else if (categoria === 'SALPICADERO') {
        this.productosPorZona['Salpicadero'].push({ id: product.id, nombre: product.tipoProducto });
      } else if (categoria === 'GUARDA ESCOBA') {
        this.productosPorZona['Guarda Escoba'].push({ id: product.id, nombre: product.tipoProducto });
      }
    });
  }

  // Método para enviar el formulario
  enviar() {
    if (this.form.valid) {
      const payload = { zonas: this.form.value.zonas };
      console.log(payload); // Aquí puedes enviar al backend
    } else {
      console.error('Formulario no válido');
    }
  }
}