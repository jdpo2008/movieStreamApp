import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthProvider } from '../../enums';
import { AuthProcessService } from '../../services/auth-sync.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  authProvider: AuthProvider;
  constructor(
    private fb: FormBuilder,
    public _authService: AuthProcessService
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this._authService
      .signInWith(AuthProvider.EmailAndPassword, {
        email: this.f.email.value,
        password: this.f.password.value,
      })
      .finally(() => (this.submitted = false));
  }

  googleLogin() {
    this._authService.signInWith(AuthProvider.Google);
  }

  facebookLogin() {
    this._authService.signInWith(AuthProvider.Facebook);
  }

  twitterLogin() {
    this._authService.signInWith(AuthProvider.Twitter);
  }

  getMessageError(control: FormControl) {}
}
