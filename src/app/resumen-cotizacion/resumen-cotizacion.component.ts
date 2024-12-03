import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { CotizacionService } from '../services/Resumen.service';

@Component({
  selector: 'app-resumen-cotizacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-cotizacion.component.html',
  styleUrls: ['./resumen-cotizacion.component.css'],
})
export class ResumenCotizacionComponent implements OnInit {
  data: any;

  // Ejemplo de id que se pasará al servicio
  private idCotizacion: number = 53;  

  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit() {
    // Pasar el idCotizacion al método getResumen()
    this.cotizacionService.getResumen(this.idCotizacion).subscribe({
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
