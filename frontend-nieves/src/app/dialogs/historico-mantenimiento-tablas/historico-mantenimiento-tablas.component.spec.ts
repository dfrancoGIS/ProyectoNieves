import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMantenimientoTablasComponent } from './historico-mantenimiento-tablas.component';

describe('HistoricoMantenimientoTablasComponent', () => {
  let component: HistoricoMantenimientoTablasComponent;
  let fixture: ComponentFixture<HistoricoMantenimientoTablasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoMantenimientoTablasComponent]
    });
    fixture = TestBed.createComponent(HistoricoMantenimientoTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
