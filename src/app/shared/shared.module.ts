import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { PipesModule } from './pipes/pipes.module';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { PagesHeaderComponent } from './components/pages-header/pages-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarHeaderComponent } from './components/sidebar-header/sidebar-header.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    PagesHeaderComponent,
    FooterComponent,
    SidebarHeaderComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    PipesModule,
    TranslateModule.forChild(),
  ],
  exports: [
    PipesModule,
    NgbModule,
    SidebarComponent,
    HeaderComponent,
    PagesHeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
