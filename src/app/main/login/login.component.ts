import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted : boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.submitted  = false;
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      remember: [false]
    });
    console.log(this.loginForm.controls.email)
  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted  = true;

    console.log(this.loginForm.value)
  }

  getMessageError(control: FormControl) {

  }

}
