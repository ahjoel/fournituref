import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatLivraisonComponent } from './etat-livraison.component';

describe('EtatLivraisonComponent', () => {
  let component: EtatLivraisonComponent;
  let fixture: ComponentFixture<EtatLivraisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatLivraisonComponent]
    });
    fixture = TestBed.createComponent(EtatLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
