import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

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
  ],
  providers: [MessageService],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'], 
})
export class AddEditProductComponent {
  categorias: Category[] = [];
  selectedItem: string | undefined;
  id: number;
  cat: Number = 3;

  // Creación del signal para la sincronización del formulario
  fomr2 = signal<FormGroup>(
    new FormGroup({
      tipoProducto: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      precio: new FormControl(null, Validators.required),
      unidadMedida: new FormControl(''),
      medida: new FormControl(''),
      idCategoria: new FormControl([], [Validators.required]),
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

  // Métodos para desencadenar la notificación toast
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

  // Este método se ejecuta al cargarse el componente
  ngOnInit() {
    if (this.id != 0) {
      this.getProduct(this.id);
    }
    this.getListCategories();
  }

  // Método para obtener todas las categorías
  getListCategories() {
    this._categoryService.getListProducts().subscribe((data: Category[]) => {
      console.log(data);
      this.categorias = data;
    });
  }

  // Método para crear el producto por medio del servicio
  addProduct() {
    // Se establecen los valores del formulario a la interfaz de producto
    const product: Product = {
      tipoProducto: this.fomr2().value.tipoProducto,
      precio: this.fomr2().value.precio,
      unidadMedida: this.fomr2().value.unidadMedida,
      medida: this.fomr2().value.medida,
      categoriaProductos: this.fomr2().value.idCategoria,
    };

    if (this.id !== 0) {
      // Es editar
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        console.log('El producto fue actualizado');
        this.fomr2().reset();
        this.showUpdate();
      });
    } else if (this.fomr2().valid) {
      this._productService.saveProduct(product).subscribe(() => {
        console.log('Producto agregado');
        this.fomr2().reset();
        this.showAdd();

        // Se vuelven a establecer los valores del formulario
        this.fomr2.set(
          new FormGroup({
            tipoProducto: new FormControl('', [
              Validators.required,
              Validators.maxLength(255),
            ]),
            precio: new FormControl(null, Validators.required),
            unidadMedida: new FormControl(''),
            medida: new FormControl(''),
            idCategoria: new FormControl([], [Validators.required]),
          })
        );
      });
    }
  }

  // Función para consultar un producto específico y establecer cada valor en los inputs del formulario
  getProduct(id: number) {
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.fomr2().setValue({
        tipoProducto: data.tipoProducto,
        precio: data.precio,
        unidadMedida: data.unidadMedida,
        medida: data.medida,
        idCategoria: data.categoriaProductos,
      });
    });
  }
}
