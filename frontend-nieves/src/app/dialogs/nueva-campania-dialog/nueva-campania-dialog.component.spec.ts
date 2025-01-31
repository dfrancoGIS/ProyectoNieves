import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCampaniaDialogComponent } from './nueva-campania-dialog.component';

describe('NuevaCampaniaDialogComponent', () => {
  let component: NuevaCampaniaDialogComponent;
  let fixture: ComponentFixture<NuevaCampaniaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaCampaniaDialogComponent]
    });
    fixture = TestBed.createComponent(NuevaCampaniaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
