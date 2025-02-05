import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSalmueraDialogComponent } from './editar-salmuera-dialog.component';

describe('EditarSalmueraDialogComponent', () => {
  let component: EditarSalmueraDialogComponent;
  let fixture: ComponentFixture<EditarSalmueraDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarSalmueraDialogComponent]
    });
    fixture = TestBed.createComponent(EditarSalmueraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
