import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneCommandeComponent } from './list-ligne-commande.component';

describe('ListLigneCommandeComponent', () => {
  let component: ListLigneCommandeComponent;
  let fixture: ComponentFixture<ListLigneCommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLigneCommandeComponent]
    });
    fixture = TestBed.createComponent(ListLigneCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
