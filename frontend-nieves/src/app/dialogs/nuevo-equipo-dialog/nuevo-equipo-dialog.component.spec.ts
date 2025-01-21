import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEquipoDialogComponent } from './nuevo-equipo-dialog.component';

describe('NuevoEquipoDialogComponent', () => {
  let component: NuevoEquipoDialogComponent;
  let fixture: ComponentFixture<NuevoEquipoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoEquipoDialogComponent]
    });
    fixture = TestBed.createComponent(NuevoEquipoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
