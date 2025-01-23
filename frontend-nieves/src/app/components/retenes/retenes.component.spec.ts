import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetenesComponent } from './retenes.component';

describe('RetenesComponent', () => {
  let component: RetenesComponent;
  let fixture: ComponentFixture<RetenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetenesComponent]
    });
    fixture = TestBed.createComponent(RetenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
