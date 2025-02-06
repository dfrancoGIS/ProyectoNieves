import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoTablasDialogComponent } from './mantenimiento-tablas-dialog.component';

describe('MantenimientoTablasDialogComponent', () => {
  let component: MantenimientoTablasDialogComponent;
  let fixture: ComponentFixture<MantenimientoTablasDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantenimientoTablasDialogComponent]
    });
    fixture = TestBed.createComponent(MantenimientoTablasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
