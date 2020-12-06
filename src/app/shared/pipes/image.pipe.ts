import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFill',
})
export class ImagePipe implements PipeTransform {
  transform(value: string, size: string): string {
    if (value) {
      return `https://image.tmdb.org/t/p/w${size}/${value}`;
    } else {
      return 'assets/images/no-image.jpg';
    }
  }
}
