import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosInformesComponent } from './documentos-informes.component';

describe('DocumentosInformesComponent', () => {
  let component: DocumentosInformesComponent;
  let fixture: ComponentFixture<DocumentosInformesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentosInformesComponent]
    });
    fixture = TestBed.createComponent(DocumentosInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
