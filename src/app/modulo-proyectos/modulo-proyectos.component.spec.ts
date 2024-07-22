import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloProyectosComponent } from './modulo-proyectos.component';

describe('ModuloProyectosComponent', () => {
  let component: ModuloProyectosComponent;
  let fixture: ComponentFixture<ModuloProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
