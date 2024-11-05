import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAptoComponent } from './crear-apto.component';

describe('CrearAptoComponent', () => {
  let component: CrearAptoComponent;
  let fixture: ComponentFixture<CrearAptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAptoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
