import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

//interfaces
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';

//servicios
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';

//modulos
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
// import { AccordionModule } from 'primeng/accordion';
// import { CustomCurrencyPipe } from '../custom-currency.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';





const PRIMENG = [
  ButtonModule,
  TableModule,
  TagModule,
  RippleModule,
  SplitButtonModule,
  PaginatorModule,
  ToastModule

];

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-lista-precios',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PRIMENG,
    SelectButtonModule,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './lista-precios.component.html',
  styleUrl: './lista-precios.component.css',
})
export class ListaPreciosComponent {

  // constructor
  constructor(private _productService: ProductService,private _categoryService: CategoryService,private messageService: MessageService) {

    // arreglo de categorias
    this.items = [
      {
        label: 'Acabados',
        items:[
            {
              label: 'Muros',
              command: () => {
                this.getListProductsByCategory(1);
              },
            },
            {
              label: 'Pisos Generales',
              command: () => {
                this.getListProductsByCategory(2);
              },
            },
            {
              label: 'Pisos Baños',
              command: () => {
                this.getListProductsByCategory(3);
              },
            },
            {
              label: 'Techos',
              command: () => {
                this.getListProductsByCategory(4);
              },
            },

        ],

      },
      {
        label: 'Carpinteria',
        items:[
          {
            label: 'Habitaciones',
            command: () => {
              this.getListProductsByCategory(6);
            },
          },
          {
            label: 'Cocina',
            command: () => {
              this.getListProductsByCategory(7);
            },
          },
          {
            label: 'Baños',
            command: () => {
              this.getListProductsByCategory(10);
            },
          },
      ],
      },
      {
        label: 'Red electrica',
        command: () => {
          this.getListProductsByCategory(5);
        },
      },
      {
        label: 'Aparatos',
       items: [
        {
          label: 'Cocina',
          command: () => {
            this.getListProductsByCategory(8);
          },
        },
        {
          label: 'Baños',
          command: () => {
            this.getListProductsByCategory(9);
          },
        }
       ]
      },

    ];
  }

  first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }



  selectedItem: string | undefined;

  categoria: number = 0;
  ListProducts: Product[] = [];
  ListCategories: Category[] = [];
  cols: any[] = [];
  matchModeOptions: SelectItem[]  = [];
  items: MenuItem[] = [];


  ngOnInit() {
    const customFilterName = 'custom-equals';
    this.getListProducts();
    //  this.getListCategories()
    if (this.categoria != 0) {
      this.getListProductsByCategory(this.categoria);
    }
  }
  value!: number;



  getListProducts(){
    this._productService.getListProducts().subscribe((data: Product[]) => {
      console.log(data);
      this.ListProducts = data;
    });
  }

  deleteProduct(id: number) {
    // console.log(id)
    this.showdelete();
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
    });
  }

  getListCategories() {
    this._categoryService.getListProducts().subscribe((data: Category[]) => {
      console.log(data);
      this.ListCategories = data;
    });
  }

  getListProductsByCategory(id: number) {
    // console.log(id)
    this.categoria = id;
    this._productService
      .getProductsByCategory(id)
      .subscribe((data: Product[]) => {
        this.ListProducts = data;
        console.log(data);
      });
  }

  formatCurrency(value: number): string {
    if (!value) return '';
    let formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
    return formattedValue;
  }

  showdelete() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Producto eliminado',
      detail: 'El producto ha sido eliminado con exito'
      });
}
}
