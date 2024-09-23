import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDialogComponent } from './approve-dialog.component';

describe('ApproveDialogComponent', () => {
  let component: ApproveDialogComponent;
  let fixture: ComponentFixture<ApproveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveDialogComponent]
    });
    fixture = TestBed.createComponent(ApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
