import { TestBed } from '@angular/core/testing';

import { CotizacionService } from '../../services/cotizacion.service';

describe('CotizacionService', () => {
  let service: CotizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
