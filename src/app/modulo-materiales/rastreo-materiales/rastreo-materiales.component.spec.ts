import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreoMaterialesComponent } from './rastreo-materiales.component';

describe('RastreoMaterialesComponent', () => {
  let component: RastreoMaterialesComponent;
  let fixture: ComponentFixture<RastreoMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RastreoMaterialesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RastreoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
