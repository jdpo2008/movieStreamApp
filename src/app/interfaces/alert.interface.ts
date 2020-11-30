import { SweetAlertIcon } from 'sweetalert2';

export interface AlertContent {
  title: string;
  text: string;
  icon: SweetAlertIcon;
  timer: number;
}
