import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioTurnosComponent } from './calendario-turnos.component';

describe('CalendarioTurnosComponent', () => {
  let component: CalendarioTurnosComponent;
  let fixture: ComponentFixture<CalendarioTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioTurnosComponent]
    });
    fixture = TestBed.createComponent(CalendarioTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
