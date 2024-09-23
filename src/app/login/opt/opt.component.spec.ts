import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptComponent } from './opt.component';

describe('OptComponent', () => {
  let component: OptComponent;
  let fixture: ComponentFixture<OptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptComponent]
    });
    fixture = TestBed.createComponent(OptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
