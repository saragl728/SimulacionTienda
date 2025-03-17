import { TestBed } from '@angular/core/testing';

import { CatProdService } from './cat-prod.service';

describe('CatProdService', () => {
  let service: CatProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
