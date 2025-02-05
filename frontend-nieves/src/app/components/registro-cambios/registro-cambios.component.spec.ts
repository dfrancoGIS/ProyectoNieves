import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCambiosComponent } from './registro-cambios.component';

describe('RegistroCambiosComponent', () => {
  let component: RegistroCambiosComponent;
  let fixture: ComponentFixture<RegistroCambiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroCambiosComponent]
    });
    fixture = TestBed.createComponent(RegistroCambiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
