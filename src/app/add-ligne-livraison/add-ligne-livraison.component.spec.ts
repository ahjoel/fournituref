import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLigneLivraisonComponent } from './add-ligne-livraison.component';

describe('AddLigneLivraisonComponent', () => {
  let component: AddLigneLivraisonComponent;
  let fixture: ComponentFixture<AddLigneLivraisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLigneLivraisonComponent]
    });
    fixture = TestBed.createComponent(AddLigneLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
