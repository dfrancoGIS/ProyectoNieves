import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMantenimientoDialogComponent } from './edit-mantenimiento-dialog.component';

describe('EditMantenimientoDialogComponent', () => {
  let component: EditMantenimientoDialogComponent;
  let fixture: ComponentFixture<EditMantenimientoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMantenimientoDialogComponent]
    });
    fixture = TestBed.createComponent(EditMantenimientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
