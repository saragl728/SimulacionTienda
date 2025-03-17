import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProdComponent } from './nuevo-prod.component';

describe('NuevoProdComponent', () => {
  let component: NuevoProdComponent;
  let fixture: ComponentFixture<NuevoProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
