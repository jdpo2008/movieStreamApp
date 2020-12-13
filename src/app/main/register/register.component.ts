import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProcessService } from '../../services/auth-sync.service';
import { AuthProvider } from '../../enums';

const EMAIL_REGEX = new RegExp(
  [
    '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
    "[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+",
    "[a-zA-Z]{2,}))$",
  ].join("")
);

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

  isValidInput(fieldName: string): boolean {
    return this.registerForm.controls[fieldName].invalid &&
      (this.registerForm.controls[fieldName].dirty || this.registerForm.controls[fieldName].touched);
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
            Validators.pattern(EMAIL_REGEX),
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
        policy: [false, [Validators.required, Validators.requiredTrue]],
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
