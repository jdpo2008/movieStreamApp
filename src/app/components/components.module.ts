import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [MovieCardComponent],
  imports: [CommonModule, RatingModule],
  exports: [MovieCardComponent],
})
export class ComponentsModule {}
