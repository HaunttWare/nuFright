import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal);

const badgeToast = mySwal.mixin({
  toast: true,
  position: 'top',
  background: '#181a1b',
  timer: 2500,
  timerProgressBar: true,
  showConfirmButton: false,
  color: '#fff'
});

export {
  badgeToast
}