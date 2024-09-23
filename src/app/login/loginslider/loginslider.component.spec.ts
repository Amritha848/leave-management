import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsliderComponent } from './loginslider.component';

describe('LoginsliderComponent', () => {
  let component: LoginsliderComponent;
  let fixture: ComponentFixture<LoginsliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginsliderComponent]
    });
    fixture = TestBed.createComponent(LoginsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
