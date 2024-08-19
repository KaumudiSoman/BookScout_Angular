import { CanActivateFn } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);

  return authService.user$.pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        toastrService.error('Please log in', 'Unauthorized Access!');
        return false;
      }
    })
  )
};