import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCatComponent } from './conf-cat.component';

describe('ConfCatComponent', () => {
  let component: ConfCatComponent;
  let fixture: ComponentFixture<ConfCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
