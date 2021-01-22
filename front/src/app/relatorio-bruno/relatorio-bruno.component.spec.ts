import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioBrunoComponent } from './relatorio-bruno.component';

describe('RelatorioBrunoComponent', () => {
  let component: RelatorioBrunoComponent;
  let fixture: ComponentFixture<RelatorioBrunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioBrunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioBrunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
