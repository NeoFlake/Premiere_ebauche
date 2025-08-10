import { TestBed } from '@angular/core/testing';

import { SearchFormService } from './search-form-service';

describe('SearchForm', () => {
  let service: SearchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
