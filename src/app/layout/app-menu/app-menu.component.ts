import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-app-menu',
  standalone: true,
  imports: [ButtonModule, AppMenuComponent, MenubarModule],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.css',
})
export class AppMenuComponent implements OnInit {
  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}
  isNotRootRoute(): boolean {
    return this.router.url !== '/';
  }
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
