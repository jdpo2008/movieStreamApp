import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { PagesHeaderComponent } from './pages-header/pages-header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SidebarComponent, HeaderComponent, PagesHeaderComponent, FooterComponent, SidebarHeaderComponent],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule
  ],
  exports: [NgbModule, SidebarComponent, HeaderComponent, PagesHeaderComponent, FooterComponent],
})
export class SharedModule { }
