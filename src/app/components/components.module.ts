import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GaugeModule } from 'angular-gauge';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../shared/pipes/pipes.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDatailsComponent } from './movie-datails/movie-datails.component';

@NgModule({
  declarations: [MovieCardComponent, MovieDatailsComponent],
  imports: [CommonModule, RatingModule, PipesModule, NgbModule, TranslateModule, GaugeModule.forRoot()],
  exports: [MovieCardComponent],
})
export class ComponentsModule {}
