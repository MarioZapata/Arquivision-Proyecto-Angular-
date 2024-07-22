import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloMisActividadesComponent } from './modulo-mis-actividades.component';

describe('ModuloMisActividadesComponent', () => {
  let component: ModuloMisActividadesComponent;
  let fixture: ComponentFixture<ModuloMisActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloMisActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloMisActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
