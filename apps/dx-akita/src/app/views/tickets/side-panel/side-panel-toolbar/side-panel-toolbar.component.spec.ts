import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelToolbarComponent } from './side-panel-toolbar.component';

describe('SidePanelToolbarComponent', () => {
  let component: SidePanelToolbarComponent;
  let fixture: ComponentFixture<SidePanelToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
