import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposModificacionComponent } from './equipos-modificacion.component';

describe('EquiposModificacionComponent', () => {
  let component: EquiposModificacionComponent;
  let fixture: ComponentFixture<EquiposModificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquiposModificacionComponent]
    });
    fixture = TestBed.createComponent(EquiposModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
