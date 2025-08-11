import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayGroup } from './form-chunk';

describe('FormArrayGroup', () => {
  let component: FormArrayGroup;
  let fixture: ComponentFixture<FormArrayGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormArrayGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
