import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthProcessService } from '../../services/auth-sync.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  formPasswordReset: FormGroup;
  submitted: boolean;

  constructor(
    private fb: FormBuilder, 
    public _authService: AuthProcessService, 
    private router: Router, 
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initPasswordResetForm();
  }

  get f() {
    return this.formPasswordReset.controls;
  }

  onSubmit() {
    this.submitted = true;
    this._authService.resetPassword(this.f.email.value)
      .then(() => {
        this.submitted = false;
        this.toastService.setMessage({ icon: 'success', title: 'Información', text: 'Verifica tu correo electrónico', timer: 5000 })
        this.router.navigate(['/main/auth/login']);
      })
      .finally(() => this.submitted = false)
  }

  private initPasswordResetForm() {
    this.formPasswordReset = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }

}
