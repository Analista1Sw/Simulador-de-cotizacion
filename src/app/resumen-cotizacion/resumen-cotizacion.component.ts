import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CotizacionService } from '../services/Resumen.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router'; // Importar Router para la navegación
import { jsPDF } from 'jspdf'; // Importar jsPDF para generar PDF

@Component({
  selector: 'app-resumen-cotizacion',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './resumen-cotizacion.component.html',
  styleUrls: ['./resumen-cotizacion.component.css'],
})
export class ResumenCotizacionComponent implements OnInit {
  data: any;
  

  // Ejemplo de id que se pasará al servicio
  private idCotizacion: number = 53;

  // Objeto para mapear los nombres de las zonas
  zonas: { [key: string]: string } = {
    productosZona1: 'Privadas y Sociales',
    productosZona2: 'Cocina',
    productosZona3: 'Baño',
    productosZona4: 'Lavado',
  };

  constructor(
    private cotizacionService: CotizacionService,
    private router: Router // Inyección del Router para navegación
  ) {}

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

  // Función para descargar el PDF
  descargarPDF(): void {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.text('Resumen de Cotización', 10, 10);

    if (this.data) {
      doc.setFont('helvetica', 'normal');
      doc.text(`Cliente: ${this.data?.prospecto?.nombre}`, 10, 20);
      doc.text(`Cédula: ${this.data?.prospecto?.documento}`, 10, 30);
      doc.text(`Proyecto: ${this.data?.proyecto?.nombre}`, 10, 40);
      doc.text(`Número Cotización: ${this.data?.proyecto?.id}`, 10, 50);
      doc.text(
        `Total Cotización: ${this.data?.totalCotizacion?.toLocaleString(
          'es-CO',
          { style: 'currency', currency: 'COP' }
        )}`,
        10,
        60
      );
    } else {
      doc.text('No hay datos disponibles.', 10, 20);
    }

    doc.save('Resumen_Cotizacion.pdf');
  }

  // Función para redirigir a la página de fidelización
  volverAFidelizacion(): void {
    this.router.navigate(['/fidel']);  
  }
}
