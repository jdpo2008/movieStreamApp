import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Error400Component } from './error400.component';

const route: Routes = [
  {
    path: "error-400",
    component: Error400Component,
    data: {
      title: "Error 400 Pages"
    }
  }
]

@NgModule({
  declarations: [Error400Component],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[]
})
export class Error400Module { }
