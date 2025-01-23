import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposEntrantesComponent } from './equipos-entrantes.component';

describe('EquiposEntrantesComponent', () => {
  let component: EquiposEntrantesComponent;
  let fixture: ComponentFixture<EquiposEntrantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquiposEntrantesComponent]
    });
    fixture = TestBed.createComponent(EquiposEntrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
