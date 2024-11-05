import { Component } from '@angular/core';
import { MaterialesPorCategoria } from '../cotizador/cotizador.component';
import { CotizacionService } from '../../services/cotizacion.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resumen-cotizacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './resumen-cotizacion.component.html',
  styleUrls: ['./resumen-cotizacion.component.css']
})
export class ResumenCotizacionComponent {
  selectedMaterials!: MaterialesPorCategoria;

  constructor(private cotizacionService: CotizacionService) {
    this.selectedMaterials = this.cotizacionService.getCotizacion();
  }
}
