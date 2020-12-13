import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GaugeModule } from 'angular-gauge';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../shared/pipes/pipes.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDatailsComponent } from './movie-datails/movie-datails.component';
import { AuthProvidersComponent } from './auth-providers/auth-providers.component';

@NgModule({
  declarations: [MovieCardComponent, MovieDatailsComponent, AuthProvidersComponent],
  imports: [HttpClientModule, CommonModule, RatingModule, PipesModule, NgbModule, TranslateModule, GaugeModule.forRoot()],
  exports: [MovieCardComponent, AuthProvidersComponent],
})
export class ComponentsModule {}
