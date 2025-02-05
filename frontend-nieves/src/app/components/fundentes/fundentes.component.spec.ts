import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundentesComponent } from './fundentes.component';

describe('FundentesComponent', () => {
  let component: FundentesComponent;
  let fixture: ComponentFixture<FundentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundentesComponent]
    });
    fixture = TestBed.createComponent(FundentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
