import { TestBed } from '@angular/core/testing';

import { IconMapping } from './icon-mapping';

describe('IconMapping', () => {
  let service: IconMapping;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconMapping);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
