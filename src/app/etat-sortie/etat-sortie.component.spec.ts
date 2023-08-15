import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatSortieComponent } from './etat-sortie.component';

describe('EtatSortieComponent', () => {
  let component: EtatSortieComponent;
  let fixture: ComponentFixture<EtatSortieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatSortieComponent]
    });
    fixture = TestBed.createComponent(EtatSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
