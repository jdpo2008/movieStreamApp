import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesContentComponent } from './pages-content/pages-content.component';
import { FullContentComponent } from './full-content/full-content.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PagesContentComponent, FullContentComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [SharedModule]
})
export class LayoutModule { }
