import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StrengthMeterModule } from 'ngx-strength-meter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register.component';
import { ComponentsModule } from '../../components/components.module';

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
    ComponentsModule,
    RouterModule.forChild(route),
  ],
})
export class RegisterModule {}
