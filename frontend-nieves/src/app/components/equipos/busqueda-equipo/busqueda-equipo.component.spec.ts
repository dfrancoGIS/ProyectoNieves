import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaEquipoComponent } from './busqueda-equipo.component';

describe('BusquedaEquipoComponent', () => {
  let component: BusquedaEquipoComponent;
  let fixture: ComponentFixture<BusquedaEquipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaEquipoComponent]
    });
    fixture = TestBed.createComponent(BusquedaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
