import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionesMeteorologicasComponent } from './estaciones-meteorologicas.component';

describe('EstacionesMeteorologicasComponent', () => {
  let component: EstacionesMeteorologicasComponent;
  let fixture: ComponentFixture<EstacionesMeteorologicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstacionesMeteorologicasComponent]
    });
    fixture = TestBed.createComponent(EstacionesMeteorologicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
