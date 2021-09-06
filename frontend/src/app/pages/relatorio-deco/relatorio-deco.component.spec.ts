import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDecoComponent } from './relatorio-deco.component';

describe('RelatorioDecoComponent', () => {
  let component: RelatorioDecoComponent;
  let fixture: ComponentFixture<RelatorioDecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioDecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
