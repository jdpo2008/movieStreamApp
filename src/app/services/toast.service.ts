import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertContent } from '../shared/interfaces/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  setMessage(content: AlertContent) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: content.timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      background: '#20223c',
      customClass: {
        title: 'title-class',
        content: 'content-class',
      },
    });

    Toast.fire({
      icon: content.icon,
      title: content.title,
      text: content.text,
    });
  }
}
