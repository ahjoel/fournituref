import { TestBed } from '@angular/core/testing';

import { LignelivraisonService } from './lignelivraison.service';

describe('LignelivraisonService', () => {
  let service: LignelivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignelivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
