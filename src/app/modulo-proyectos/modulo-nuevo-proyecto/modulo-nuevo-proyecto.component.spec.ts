import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloNuevoProyectoComponent } from './modulo-nuevo-proyecto.component';

describe('ModuloNuevoProyectoComponent', () => {
  let component: ModuloNuevoProyectoComponent;
  let fixture: ComponentFixture<ModuloNuevoProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloNuevoProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloNuevoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
