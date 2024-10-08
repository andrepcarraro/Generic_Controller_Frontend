import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputGraphComponent } from './output-graph.component';

describe('OutputGraphComponent', () => {
  let component: OutputGraphComponent;
  let fixture: ComponentFixture<OutputGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutputGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
