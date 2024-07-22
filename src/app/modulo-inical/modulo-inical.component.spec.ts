import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloInicalComponent } from './modulo-inical.component';

describe('ModuloInicalComponent', () => {
  let component: ModuloInicalComponent;
  let fixture: ComponentFixture<ModuloInicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloInicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloInicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
