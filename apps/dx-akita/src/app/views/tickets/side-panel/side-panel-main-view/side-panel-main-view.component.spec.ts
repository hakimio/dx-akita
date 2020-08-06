import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelMainViewComponent } from './side-panel-main-view.component';

describe('SidePanelMainViewComponent', () => {
  let component: SidePanelMainViewComponent;
  let fixture: ComponentFixture<SidePanelMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
