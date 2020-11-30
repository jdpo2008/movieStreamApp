import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';



const route: Routes = [
  {
    path: "",
    component: RegisterComponent,
    data: {
      title: "Register Pages"
    }
  }
]


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class RegisterModule { }
