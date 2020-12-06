import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProcessService } from '../../services/auth-sync.service';
import { AuthProvider } from '../../enums';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;
  strength: number;
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  constructor(
    private fb: FormBuilder,
    private _authService: AuthProcessService
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.f.policy.value) return;

    this._authService
      .signUp(this.f.displayName.value, {
        email: this.f.email.value,
        password: this.f.password.value,
      })
      .finally(() => {
        this.submitted = false;
      });
  }
  onStrengthChange(event: any) {
    console.log(event);
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

  private initRegisterForm() {
    this.registerForm = this.fb.group(
      {
        displayName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        policy: [false, [Validators.required]],
      },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  private ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
