import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';

const route: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login Pages',
    },
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(route),
  ],
})
export class LoginModule {}
