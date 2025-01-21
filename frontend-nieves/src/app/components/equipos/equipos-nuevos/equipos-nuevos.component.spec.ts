import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposNuevosComponent } from './equipos-nuevos.component';

describe('EquiposNuevosComponent', () => {
  let component: EquiposNuevosComponent;
  let fixture: ComponentFixture<EquiposNuevosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquiposNuevosComponent]
    });
    fixture = TestBed.createComponent(EquiposNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
