import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStepDialogComponent } from './second-step-dialog.component';

describe('SecondStepDialogComponent', () => {
  let component: SecondStepDialogComponent;
  let fixture: ComponentFixture<SecondStepDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondStepDialogComponent]
    });
    fixture = TestBed.createComponent(SecondStepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
