import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadIndividualComponent } from './actividad-individual.component';

describe('ActividadIndividualComponent', () => {
  let component: ActividadIndividualComponent;
  let fixture: ComponentFixture<ActividadIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActividadIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActividadIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
