import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCatProdComponent } from './nuevo-cat-prod.component';

describe('NuevoCatProdComponent', () => {
  let component: NuevoCatProdComponent;
  let fixture: ComponentFixture<NuevoCatProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoCatProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoCatProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
