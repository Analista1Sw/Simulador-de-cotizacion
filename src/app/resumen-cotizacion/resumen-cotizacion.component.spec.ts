import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCotizacionComponent } from './resumen-cotizacion.component';

describe('ResumenCotizacionComponent', () => {
  let component: ResumenCotizacionComponent;
  let fixture: ComponentFixture<ResumenCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenCotizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
