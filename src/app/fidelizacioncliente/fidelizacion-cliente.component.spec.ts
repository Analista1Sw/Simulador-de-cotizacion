import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelizacionClienteComponent } from './fidelizacion-cliente.component';

describe('FidelizacionClienteComponent', () => {
  let component: FidelizacionClienteComponent;
  let fixture: ComponentFixture<FidelizacionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FidelizacionClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidelizacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
