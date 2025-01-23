import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacionesComponent } from './comunicaciones.component';

describe('ComunicacionesComponent', () => {
  let component: ComunicacionesComponent;
  let fixture: ComponentFixture<ComunicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicacionesComponent]
    });
    fixture = TestBed.createComponent(ComunicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
