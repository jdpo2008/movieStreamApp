import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { Error400Component } from './error400/error400.component';


@NgModule({
  declarations: [Error400Component],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
