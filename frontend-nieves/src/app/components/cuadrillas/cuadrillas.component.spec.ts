import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadrillasComponent } from './cuadrillas.component';

describe('CuadrillasComponent', () => {
  let component: CuadrillasComponent;
  let fixture: ComponentFixture<CuadrillasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadrillasComponent]
    });
    fixture = TestBed.createComponent(CuadrillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
