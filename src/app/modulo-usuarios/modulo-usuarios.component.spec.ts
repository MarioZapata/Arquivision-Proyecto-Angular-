import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloUsuariosComponent } from './modulo-usuarios.component';

describe('ModuloUsuariosComponent', () => {
  let component: ModuloUsuariosComponent;
  let fixture: ComponentFixture<ModuloUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
