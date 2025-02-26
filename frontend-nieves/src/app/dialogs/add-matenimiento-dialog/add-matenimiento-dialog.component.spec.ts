import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatenimientoDialogComponent } from './add-matenimiento-dialog.component';

describe('AddMatenimientoDialogComponent', () => {
  let component: AddMatenimientoDialogComponent;
  let fixture: ComponentFixture<AddMatenimientoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMatenimientoDialogComponent]
    });
    fixture = TestBed.createComponent(AddMatenimientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
