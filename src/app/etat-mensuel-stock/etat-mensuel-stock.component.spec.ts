import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatMensuelStockComponent } from './etat-mensuel-stock.component';

describe('EtatMensuelStockComponent', () => {
  let component: EtatMensuelStockComponent;
  let fixture: ComponentFixture<EtatMensuelStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatMensuelStockComponent]
    });
    fixture = TestBed.createComponent(EtatMensuelStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
