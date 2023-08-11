import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneLivraisonComponent } from './list-ligne-livraison.component';

describe('ListLigneLivraisonComponent', () => {
  let component: ListLigneLivraisonComponent;
  let fixture: ComponentFixture<ListLigneLivraisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLigneLivraisonComponent]
    });
    fixture = TestBed.createComponent(ListLigneLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
