import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloMaterialesComponent } from './modulo-materiales.component';

describe('ModuloMaterialesComponent', () => {
  let component: ModuloMaterialesComponent;
  let fixture: ComponentFixture<ModuloMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloMaterialesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
