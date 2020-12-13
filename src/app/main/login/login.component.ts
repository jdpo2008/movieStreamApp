import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthProvider } from '../../enums';
import { AuthProcessService } from '../../services/auth-sync.service';

const EMAIL_REGEX = new RegExp(
  [
    '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
    "[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+",
    "[a-zA-Z]{2,}))$",
  ].join("")
);
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  authProvider: AuthProvider;
  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    public _authService: AuthProcessService
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.cd.markForCheck();
    this._authService
      .signInWith(AuthProvider.EmailAndPassword, {
        email: this.f.email.value,
        password: this.f.password.value,
      })
      .finally(() => {
        this.submitted = false; 
        this.cd.markForCheck();
      });
  }

  getMessageError(control: FormControl) {}

  isValidInput(fieldName: string): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

}
