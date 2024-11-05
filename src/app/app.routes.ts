import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListaPreciosComponent } from './lista-precios/lista-precios.component';
import { AppMenuComponent } from './layout/app-menu/app-menu.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreAlistamientoComponent } from './pre-alistamiento/pre-alistamiento.component';
import { CrearAptoComponent } from './crear-apto/crear-apto.component';
import { FidelizacionClienteComponent } from './fidelizacioncliente/fidelizacion-cliente.component';
import { PruebaComponent } from './prueba/prueba.component';
import { ResumenCotizacionComponent } from './resumen-cotizacion/resumen-cotizacion.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'lista', component: ListaPreciosComponent },
  { path: 'fidel', component: FidelizacionClienteComponent },
  { path: 'cotizar', component: CotizadorComponent },
  { path: 'resumen', component: ResumenCotizacionComponent},
  { path: 'preAlistamiento', component: PreAlistamientoComponent },
  { path: 'preAlistamiento/apartamento', component: CrearAptoComponent },
  { path: 'prueba', component: PruebaComponent },
  { path: 'add', component: AddEditProductComponent },
  { path: 'edit/:id', component: AddEditProductComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
