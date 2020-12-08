import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PasswordResetComponent } from './password-reset.component';

const route: Routes = [
  {
    path: '',
    component: PasswordResetComponent,
    data: {
      title: 'Password Reset Pages',
    },
  },
];


@NgModule({
  declarations: [PasswordResetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class PasswordResetModule { }
