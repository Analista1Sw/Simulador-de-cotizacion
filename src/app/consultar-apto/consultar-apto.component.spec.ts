import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAptoComponent } from './consultar-apto.component';

describe('ConsultarAptoComponent', () => {
  let component: ConsultarAptoComponent;
  let fixture: ComponentFixture<ConsultarAptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarAptoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarAptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
