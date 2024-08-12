import { inject } from '@angular/core';
import { CanActivateFn, Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);  


  return authService.isLoggedIn().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        toastr.warning('You don\'t have permission to access this page.');
        const navigationExtras: NavigationExtras = {
          queryParams: { returnUrl: state.url }
        };
        router.navigate(['/login'], navigationExtras);
        return false;
      }
    })
  );
};
