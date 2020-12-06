import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [MovieCardComponent],
  imports: [CommonModule, RatingModule, PipesModule],
  exports: [MovieCardComponent],
})
export class ComponentsModule {}
