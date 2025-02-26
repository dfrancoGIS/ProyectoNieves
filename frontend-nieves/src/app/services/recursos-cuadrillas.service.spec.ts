import { TestBed } from '@angular/core/testing';

import { RecursosCuadrillasService } from './recursos-cuadrillas.service';

describe('RecursosCuadrillasService', () => {
  let service: RecursosCuadrillasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursosCuadrillasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
