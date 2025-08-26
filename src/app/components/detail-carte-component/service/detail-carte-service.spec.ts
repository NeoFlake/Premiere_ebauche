import { TestBed } from '@angular/core/testing';

import { DetailCarteService } from './detail-carte-service';

describe('DetailCarteService', () => {
  let service: DetailCarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailCarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
