import { TestBed } from '@angular/core/testing';

import { ApiRestAltered } from './api-rest-altered';

describe('ApiRestAltered', () => {
  let service: ApiRestAltered;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRestAltered);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
