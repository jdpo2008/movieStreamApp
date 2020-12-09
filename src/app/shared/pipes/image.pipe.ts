import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFill',
})
export class ImagePipe implements PipeTransform {
  transform(value: string, size: string): string {
    if (value) {
      return `https://image.tmdb.org/t/p/w${size}_and_h660_face/${value}`;
    } else {
      return 'assets/images/no-image.jpg';
    }
  }
}
