import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StrengthMeterModule } from 'ngx-strength-meter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register.component';

const route: Routes = [
  {
    path: '',
    component: RegisterComponent,
    data: {
      title: 'Register Pages',
    },
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    StrengthMeterModule,
    RouterModule.forChild(route),
  ],
})
export class RegisterModule {}
