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
import { SelectItem } from 'primeng/api';
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
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    JsonPipe,
    FloatLabelModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    ToastModule,
    RippleModule
  ],
  providers: [MessageService],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css',

})
export class AddEditProductComponent {
  categorias: Category[] = [];
  selectedItem: string | undefined;
  id:number
  cat: Number = 3;

  // Creacion del signal para la sincronizacion del formulario
  fomr2 = signal<FormGroup>(
    new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      precio: new FormControl(null, Validators.required),
      unidadmedida: new FormControl(''),
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
    this.id =  Number (aRoute.snapshot.paramMap.get('id'))
  }

  // Metodos para desencadenar la notificacion toast
    showAdd() {
        this.messageService.add({
          severity: 'success',
          summary: 'Agregado',
          detail: 'El producto ha sido agregado con exito'
          });
    }

    showUdpate() {
      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'El producto ha sido actualizado con exito'
        });
  }

  // Este metodo se ejecuta al cargarse el componente
  ngOnInit() {
    if(this.id != 0){
      this.getProduct(this.id);
    }
    this.getListCategories();

    this._categoryService.getListProducts

  }
  // Metodo para obtener todas las categorias
  getListCategories() {
    this._categoryService.getListProducts().subscribe((data: Category[]) => {
      console.log(data);
      this.categorias = data;
    });
  }

  // Metodo para crear el producto por medio del servicio
  addProduct() {

    // Se establecen los valores el fomurlario a la interfaz de producto
    const product: Product = {
      descripcion: this.fomr2().value.description,
      // imagen: this.fomr2().value.imagen,
      precio: this.fomr2().value.precio,
      unidadmedida: this.fomr2().value.unidadmedida,
      medida: this.fomr2().value.medida,
      idcategoria: this.fomr2().value.idCategoria,
    };
      //verificacion si el formulario es valido


    if(this.id !== 0){
      //Es editar
      product.id = this.id
      this._productService.updateProduct(this.id, product).subscribe(()=>{
        console.log('El producto fue actualizado')
        this.fomr2().reset();
        this.showUdpate();

      })
  }else if (this.fomr2().valid) {
    this._productService.saveProduct(product).subscribe(() => {
      console.log('Producto agregado');
      console.log(product)
      this.fomr2().reset();
      this.showAdd();

      // Se vuelven a establecer los valores del formulario
      this.fomr2.set(
        new FormGroup({
          description: new FormControl('', [
            Validators.required,
            Validators.maxLength(255),
          ]),
          precio: new FormControl(null, Validators.required),
          unidadmedida: new FormControl(''),
          medida: new FormControl(''),
          idCategoria: new FormControl([], [Validators.required]),
        })
      );
    });

  }}

  // Funcion para consultar un producto especifico y estabelcer cada valor em los inputs del formulario
  getProduct(id:number){
    this._productService.getProduct(id).subscribe((data:Product) =>{
      // console.log(data)

      this.fomr2().setValue({
        description: data.descripcion,
        precio: data.precio,
        unidadmedida: data.unidadmedida,
        medida: data.medida,
        idCategoria: data.idcategoria
      })
    })
  }
}
