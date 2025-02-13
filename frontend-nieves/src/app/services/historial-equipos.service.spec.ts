import { TestBed } from '@angular/core/testing';

import { HistorialEquiposService } from './historial-equipos.service';

describe('HistorialEquiposService', () => {
  let service: HistorialEquiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialEquiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
