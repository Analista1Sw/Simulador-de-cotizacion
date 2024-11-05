import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAlistamientoComponent } from './pre-alistamiento.component';

describe('PreAlistamientoComponent', () => {
  let component: PreAlistamientoComponent;
  let fixture: ComponentFixture<PreAlistamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreAlistamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreAlistamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
