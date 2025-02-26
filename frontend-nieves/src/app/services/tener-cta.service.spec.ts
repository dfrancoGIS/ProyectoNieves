import { TestBed } from '@angular/core/testing';

import { TenerCtaService } from './tener-cta.service';

describe('TenerCtaService', () => {
  let service: TenerCtaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenerCtaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
