import { TestBed } from '@angular/core/testing';

import { FormArrayGroupService } from './form-array-group-service';

describe('FormArrayGroupService', () => {
  let service: FormArrayGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormArrayGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
