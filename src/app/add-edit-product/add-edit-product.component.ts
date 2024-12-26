import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Category } from '../interfaces/category';
import { CategoryService } from '../services/category.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { JsonPipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    ToastModule,
    RippleModule,
    JsonPipe,
  ],
  providers: [MessageService],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent {
  categorias: Category[] = [];
  id: number;
  isEditMode: boolean = false; // Variable para identificar si es edición

  // Opciones para el dropdown de unidades de medida
  unidadesMedida = [
    { id: 'N/A', nombre: 'N/A' },
    { id: 'M2', nombre: 'M2' },
    { id: 'ML', nombre: 'ML' },
    { id: 'UND', nombre: 'UND' },
  ];

  // Define el formulario como una propiedad de la clase
  fomr2: FormGroup;

  constructor(
    private messageService: MessageService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder // Necesario para crear el formulario
  ) {
    this.id = Number(aRoute.snapshot.paramMap.get('id'));

    // Inicializa el formulario dentro del constructor
    this.fomr2 = this.fb.group({
      tipoProducto: ['', [Validators.required, Validators.maxLength(255)]],
      descripcionProducto: ['', Validators.required],
      precio: [null, Validators.required],
      unidadMedida: [''],
      medida: [null, Validators.required],
      categoriaProductos: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.id != 0) {
      this.isEditMode = true; // Se activa el modo de edición
      this.getProduct(this.id); // Carga el producto para edición
    }
    this.getListCategories(); // Carga las categorías disponibles
  }

  getListCategories() {
    this._categoryService.getListProducts().subscribe((data: any[]) => {
      const categoriasMap = new Map();

      data.forEach((producto) => {
        if (producto.categoriaProductos) {
          categoriasMap.set(
            producto.categoriaProductos.id,
            producto.categoriaProductos
          );
        }
      });

      this.categorias = Array.from(categoriasMap.values());
    });
  }

  addProduct() {
    const product: Product = {
      tipoProducto: this.fomr2.value.tipoProducto,
      descripcionProducto: this.fomr2.value.descripcionProducto || '',
      unidadMedida: this.fomr2.value.unidadMedida.id,
      medida: this.fomr2.value.medida,
      precio: this.fomr2.value.precio,
      idEmpresa: 13,
      categoriaProductos: this.fomr2.value.categoriaProductos?.id,
    };

    console.log('Producto enviado:', product);

    if (this.isEditMode) {
      // Si estamos en modo de edición, se actualiza el producto
      this._productService.updateProduct(this.id, product).subscribe({
        next: () => {
          this.showUpdate(); // Muestra mensaje de éxito de actualización
          this.fomr2.reset();
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
        },
      });
    } else {
      // Si estamos en modo de creación, se guarda el producto nuevo
      this._productService.saveProduct(product).subscribe({
        next: () => {
          this.showAdd(); // Muestra mensaje de éxito de creación
          this.fomr2.reset();
        },
        error: (err) => {
          console.error('Error al guardar el producto:', err);
        },
      });
    }
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.fomr2.setValue({
        tipoProducto: data.tipoProducto,
        descripcionProducto: data.descripcionProducto,
        precio: data.precio,
        unidadMedida: data.unidadMedida,
        medida: data.medida,
        categoriaProductos: data.categoriaProductos,
      });
    });
  }

  showAdd() {
    this.messageService.add({
      severity: 'success',
      summary: 'Agregado',
      detail: 'El producto ha sido agregado con éxito',
    });
  }

  showUpdate() {
    this.messageService.add({
      severity: 'success',
      summary: 'Actualizado',
      detail: 'El producto ha sido actualizado con éxito',
    });
  }
}
