import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CotizacionService } from '../../services/Resumen.service';

@Component({
  selector: 'app-resumen-cotizacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-cotizacion.component.html',
  styleUrls: ['./resumen-cotizacion.component.css'],
})
export class ResumenCotizacionComponent implements OnInit {
  data: any; 
  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit() {
    this.cotizacionService.getResumen().subscribe({
      next: (response) => {
        this.data = response;
        console.log('Datos recibidos del backend:', this.data);
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      },
    });
  }
}
