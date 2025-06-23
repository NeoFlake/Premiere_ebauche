import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremierComposant } from './premier-composant';

describe('PremierComposant', () => {
  let component: PremierComposant;
  let fixture: ComponentFixture<PremierComposant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremierComposant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremierComposant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
