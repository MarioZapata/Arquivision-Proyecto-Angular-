import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraEnvioComponent } from './barra-envio.component';

describe('BarraEnvioComponent', () => {
  let component: BarraEnvioComponent;
  let fixture: ComponentFixture<BarraEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarraEnvioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarraEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
