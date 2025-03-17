import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCatComponent } from './nueva-cat.component';

describe('NuevaCatComponent', () => {
  let component: NuevaCatComponent;
  let fixture: ComponentFixture<NuevaCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
