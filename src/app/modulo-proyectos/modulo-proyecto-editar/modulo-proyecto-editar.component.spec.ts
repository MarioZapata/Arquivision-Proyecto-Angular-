import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloProyectoEditarComponent } from './modulo-proyecto-editar.component';

describe('ModuloProyectoEditarComponent', () => {
  let component: ModuloProyectoEditarComponent;
  let fixture: ComponentFixture<ModuloProyectoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloProyectoEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloProyectoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
