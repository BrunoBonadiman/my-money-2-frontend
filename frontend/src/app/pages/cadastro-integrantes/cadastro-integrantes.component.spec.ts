import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroIntegrantesComponent } from './cadastro-integrantes.component';

describe('CadastroIntegrantesComponent', () => {
  let component: CadastroIntegrantesComponent;
  let fixture: ComponentFixture<CadastroIntegrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroIntegrantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
