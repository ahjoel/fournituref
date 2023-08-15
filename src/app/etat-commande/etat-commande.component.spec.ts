import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatCommandeComponent } from './etat-commande.component';

describe('EtatCommandeComponent', () => {
  let component: EtatCommandeComponent;
  let fixture: ComponentFixture<EtatCommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatCommandeComponent]
    });
    fixture = TestBed.createComponent(EtatCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
