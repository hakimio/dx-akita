import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFormComponent } from './add-edit-form.component';

describe('TicketAddEditFormComponent', () => {
  let component: AddEditFormComponent;
  let fixture: ComponentFixture<AddEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
