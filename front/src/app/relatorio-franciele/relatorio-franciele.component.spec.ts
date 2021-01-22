import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFrancieleComponent } from './relatorio-franciele.component';

describe('RelatorioFrancieleComponent', () => {
  let component: RelatorioFrancieleComponent;
  let fixture: ComponentFixture<RelatorioFrancieleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioFrancieleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioFrancieleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
