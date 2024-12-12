import { TestBed } from '@angular/core/testing';

import { MySharedServiceService } from './my-shared-service.service';

describe('MySharedServiceService', () => {
  let service: MySharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
