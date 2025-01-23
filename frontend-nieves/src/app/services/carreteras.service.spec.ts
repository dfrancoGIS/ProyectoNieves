import { TestBed } from '@angular/core/testing';

import { CarreterasService } from './carreteras.service';

describe('CarreterasService', () => {
  let service: CarreterasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarreterasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
