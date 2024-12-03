import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAptoComponent } from './detalles-apto.component';

describe('DetallesAptoComponent', () => {
  let component: DetallesAptoComponent;
  let fixture: ComponentFixture<DetallesAptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesAptoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesAptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
