import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSalDialogComponent } from './editar-sal-dialog.component';

describe('EditarSalDialogComponent', () => {
  let component: EditarSalDialogComponent;
  let fixture: ComponentFixture<EditarSalDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarSalDialogComponent]
    });
    fixture = TestBed.createComponent(EditarSalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
