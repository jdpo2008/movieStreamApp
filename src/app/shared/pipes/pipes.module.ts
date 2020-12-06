import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { UserImagenPipe } from './user-image.pipe';

@NgModule({
  declarations: [ImagePipe, UserImagenPipe],
  exports: [ImagePipe, UserImagenPipe],
})
export class PipesModule {}
