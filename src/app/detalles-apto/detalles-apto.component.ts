import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ProyectoService } from '../services/Proyectos.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { JsonPipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalles-apto',
  standalone: true,
  templateUrl: './detalles-apto.component.html',
  styleUrls: ['./detalles-apto.component.css'],
  imports: [
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    JsonPipe,
    RouterModule,
  ],
  providers: [MessageService],
})
export class DetallesAptoComponent implements OnInit {
  form!: FormGroup;
  proyectos: { label: string; value: number }[] = []; // Proyectos disponibles
  zonasDisponibles: { label: string; value: number }[] = [
    { label: 'Privadas y Sociales', value: 1 },
    { label: 'Baño', value: 2 },
    { label: 'Cocina', value: 3 },
    { label: 'Lavado', value: 4 },
  ];

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      proyecto: ['', Validators.required],
      tipoApartamento: ['', Validators.required],
      medidaTotal: [null, Validators.required],
      zonas: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe(
      (proyectos) => {
        this.proyectos = proyectos.map((proyecto) => ({
          label: proyecto.nombre,
          value: proyecto.id,
        }));
        console.log('Proyectos disponibles:', this.proyectos);
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

  get zonas() {
    return this.form.get('zonas') as FormArray;
  }

  agregarZona() {
    const zonaFormGroup = this.fb.group({
      idZona: [null, Validators.required],
      muros: [null, Validators.required],
      pisos: [null, Validators.required],
      techo: [null, Validators.required],
      guardaEscoba: [null, Validators.required],
      salpicadero: [null, Validators.required],
    });
    this.zonas.push(zonaFormGroup);
  }

  eliminarZona(index: number) {
    this.zonas.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const proyectoId = this.form.value.proyecto?.value;
      const tipoApartamento = this.form.value.tipoApartamento;
      const medidaTotal = this.form.value.medidaTotal;

      // Datos del apartamento
      const datosApartamento = {
        nombre: tipoApartamento,
        medida: `${medidaTotal} m²`,
        proyecto: proyectoId,
      };

      console.log('Datos enviados al primer endpoint:', datosApartamento);

      // Enviar el primer endpoint para crear el apartamento
      this.proyectoService.createApartamento(datosApartamento).subscribe(
        (response) => {
          console.log('Apartamento creado exitosamente:', response);
          const idApartamento = response.id;

          // Mapea los datos de las zonas para cumplir con el formato esperado
          const detallesZonas = this.zonas.controls
            .map((zona) => {
              const zonaValues = zona.value;

              // Asegúrate de que solo se envíe el idZona (no el objeto completo)
              return [
                {
                  idZona: zonaValues.idZona,
                  idItemZona: 1,
                  medida: parseFloat(zonaValues.muros),
                }, // MURO
                {
                  idZona: zonaValues.idZona,
                  idItemZona: 2,
                  medida: parseFloat(zonaValues.pisos),
                }, // PISO
                {
                  idZona: zonaValues.idZona,
                  idItemZona: 3,
                  medida: parseFloat(zonaValues.guardaEscoba),
                }, // GUARDA ESCOPA
                {
                  idZona: zonaValues.idZona,
                  idItemZona: 4,
                  medida: parseFloat(zonaValues.techo),
                }, // TECHO
                {
                  idZona: zonaValues.idZona,
                  idItemZona: 7,
                  medida: parseFloat(zonaValues.salpicadero),
                }, // SALPICADERO (ID 7 en tu lista)
              ].filter((zona) => zona.medida > 0); // Filtrar medidas válidas
            })
            .flat();

          const datosZonas = {
            idApartamento,
            zonas: detallesZonas,
          };

          console.log('Datos enviados al segundo endpoint:', datosZonas);

          // Enviar los detalles del apartamento
          this.proyectoService.createApartamentosDetalle(datosZonas).subscribe(
            (responseDetalle) => {
              console.log(
                'Detalles del apartamento creados exitosamente:',
                responseDetalle
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Guardado',
                detail:
                  'El apartamento y sus detalles se guardaron correctamente',
              });
              this.form.reset();
              setTimeout(() => this.router.navigate(['/preAlistamiento']), 800);
            },
            (errorDetalle) => {
              console.error(
                'Error al guardar los detalles del apartamento:',
                errorDetalle
              );
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron guardar los detalles del apartamento',
              });
            }
          );
        },
        (error) => {
          console.error('Error al crear el apartamento:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo guardar el apartamento',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Por favor, completa todos los campos requeridos',
      });
    }
  }
}
