import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridToolbarComponent } from './data-grid-toolbar.component';

describe('TicketDataGridToolbarComponent', () => {
  let component: DataGridToolbarComponent;
  let fixture: ComponentFixture<DataGridToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGridToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
