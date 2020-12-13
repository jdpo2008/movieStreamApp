import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProvidersComponent } from './auth-providers.component';

describe('AuthProvidersComponent', () => {
  let component: AuthProvidersComponent;
  let fixture: ComponentFixture<AuthProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
