import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloProyectoVerComponent } from './modulo-proyecto-ver.component';

describe('ModuloProyectoVerComponent', () => {
  let component: ModuloProyectoVerComponent;
  let fixture: ComponentFixture<ModuloProyectoVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloProyectoVerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloProyectoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
