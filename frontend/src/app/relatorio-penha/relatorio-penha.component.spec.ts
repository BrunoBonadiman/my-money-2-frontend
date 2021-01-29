import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPenhaComponent } from './relatorio-penha.component';

describe('RelatorioPenhaComponent', () => {
  let component: RelatorioPenhaComponent;
  let fixture: ComponentFixture<RelatorioPenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioPenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioPenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
