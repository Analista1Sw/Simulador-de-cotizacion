import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}
  isNotRootRoute(): boolean {
    return this.router.url !== '';
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

      {
        label: 'Lista de Precios',
        icon: 'pi pi-list',
        routerLink: 'lista',
      },
      {
        label: 'Simulador',
        icon: 'pi pi-dollar',
        routerLink: 'cotizar',
      },
      {
        label: 'Pre-Alistamiento',
        icon: 'pi pi-building-columns',
        routerLink: 'preAlistamiento',
      },
    ];
  }
}
