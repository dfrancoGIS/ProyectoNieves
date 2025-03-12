import { TestBed } from '@angular/core/testing';

import { ActivacionService } from './activacion.service';

describe('ActivacionService', () => {
  let service: ActivacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
