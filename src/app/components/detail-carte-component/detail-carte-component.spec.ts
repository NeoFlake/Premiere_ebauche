import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCarteComponent } from './detail-carte-component';

describe('DetailCarteComponent', () => {
  let component: DetailCarteComponent;
  let fixture: ComponentFixture<DetailCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
