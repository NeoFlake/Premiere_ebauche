import { TestBed } from '@angular/core/testing';

import { PremierComposantService } from './premier-composant-service';

describe('PremierComposantService', () => {
  let service: PremierComposantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremierComposantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
