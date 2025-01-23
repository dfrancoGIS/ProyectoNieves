import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCarreteraDialogComponent } from './editar-carretera-dialog.component';

describe('EditarCarreteraDialogComponent', () => {
  let component: EditarCarreteraDialogComponent;
  let fixture: ComponentFixture<EditarCarreteraDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCarreteraDialogComponent]
    });
    fixture = TestBed.createComponent(EditarCarreteraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
