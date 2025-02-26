import { TestBed } from '@angular/core/testing';

import { EstadosComunicacionService } from './estados-comunicacion.service';

describe('EstadosComunicacionService', () => {
  let service: EstadosComunicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosComunicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
