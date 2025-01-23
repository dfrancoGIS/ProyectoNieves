import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaComunicacionDialogComponent } from './nueva-comunicacion-dialog.component';

describe('NuevaComunicacionDialogComponent', () => {
  let component: NuevaComunicacionDialogComponent;
  let fixture: ComponentFixture<NuevaComunicacionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaComunicacionDialogComponent]
    });
    fixture = TestBed.createComponent(NuevaComunicacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
