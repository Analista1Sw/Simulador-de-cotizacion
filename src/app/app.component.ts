import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppMenuComponent } from './layout/app-menu/app-menu.component';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, AppMenuComponent, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}
  title = 'Simulador';
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: 'home',
      },
      {
        label: 'Clientes',
        icon: 'pi pi-address-book',
        routerLink: 'fidel',
      },

      // {
      //   label: 'Lista de Precios',
      //   icon: 'pi pi-list',
      //   routerLink: 'lista',
      // },
      {
        label: 'Simulador',
        icon: 'pi pi-dollar',
        routerLink: 'cotizar',
      },
      // {
      //   label: 'Prueba',
      //   icon: 'pi pi-dollar',
      //   routerLink: 'prueba',
      // },
      // {
      //   label: 'Pre-Alistamiento',
      //   icon: 'pi pi-building-columns',
      //   routerLink: 'preAlistamiento',
      // },
    ];
  }
}
