import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCatProdComponent } from './conf-cat-prod.component';

describe('ConfCatProdComponent', () => {
  let component: ConfCatProdComponent;
  let fixture: ComponentFixture<ConfCatProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfCatProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfCatProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
