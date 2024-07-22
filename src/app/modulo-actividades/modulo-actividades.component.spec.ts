import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloActividadesComponent } from './modulo-actividades.component';

describe('ModuloActividadesComponent', () => {
  let component: ModuloActividadesComponent;
  let fixture: ComponentFixture<ModuloActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
