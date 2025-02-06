import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEstacionDialogComponent } from './historial-estacion-dialog.component';

describe('HistorialEstacionDialogComponent', () => {
  let component: HistorialEstacionDialogComponent;
  let fixture: ComponentFixture<HistorialEstacionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialEstacionDialogComponent]
    });
    fixture = TestBed.createComponent(HistorialEstacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
