import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
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

  // Opciones para el dropdown de unidades de medida
  unidadesMedida = [
    { id: 'N/A', nombre: 'N/A' },
    { id: 'M2', nombre: 'M2' },
    { id: 'ML', nombre: 'ML' },
    { id: 'UND', nombre: 'UND' },
  ];

  // Creación del signal para la sincronización del formulario
  fomr2 = signal<FormGroup>(
    new FormGroup({
      tipoProducto: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      descripcionProducto: new FormControl('', [Validators.required]), 
      precio: new FormControl(null, Validators.required),
      unidadMedida: new FormControl(''),
      medida: new FormControl(null,Validators.required),
      categoriaProductos: new FormControl(null, [Validators.required]),
    })
  );

  constructor(
    private messageService: MessageService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private aRoute: ActivatedRoute
  ) {
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if (this.id != 0) {
      this.getProduct(this.id);
    }
    this.getListCategories();
  }

  getListCategories() {
    this._categoryService.getListProducts().subscribe((data: any[]) => {
      // Extraer las categorías únicas
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
      tipoProducto: this.fomr2().value.tipoProducto,
      descripcionProducto: this.fomr2().value.descripcionProducto || '', // Asegurarse de que se envíe un valor, aunque esté vacío
      unidadMedida: this.fomr2().value.unidadMedida.id,
      medida: this.fomr2().value.medida, // Debe ser un número
      precio: this.fomr2().value.precio, // Debe ser un número
      idEmpresa: 13, // Asegúrate de que se envíe el ID de la empresa correcto
      categoriaProductos: this.fomr2().value.categoriaProductos?.id, // Solo el ID de la categoría
    };

    console.log('Producto enviado:', product); // Depuración: Verifica que el JSON sea correcto

    this._productService.saveProduct(product).subscribe({
      next: () => {
        this.showAdd();
        this.fomr2().reset();
      },
      error: (err) => {
        console.error('Error al guardar el producto:', err); // Log para depuración
      },
    });
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.fomr2().setValue({
        tipoProducto: data.tipoProducto,
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
