import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPopupComponent } from './add-popup.component';

describe('TicketAddPopupComponent', () => {
  let component: AddPopupComponent;
  let fixture: ComponentFixture<AddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
