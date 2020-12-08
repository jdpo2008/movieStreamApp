import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../shared/pipes/pipes.module';
import { MovieDatailsComponent } from './movie-datails/movie-datails.component';

@NgModule({
  declarations: [MovieCardComponent, MovieDatailsComponent],
  imports: [CommonModule, RatingModule, PipesModule],
  exports: [MovieCardComponent],
})
export class ComponentsModule {}
