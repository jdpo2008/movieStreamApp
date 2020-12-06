import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userImage'
})
export class UserImagenPipe implements PipeTransform {

  transform( img: string ): string {
    
    if ( img ) {
      return img;
    } else {
        return './assets/images/avatars/avatar-01.png'
    }

  }

}
