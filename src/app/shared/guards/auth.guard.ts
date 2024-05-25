import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { inject } from '@angular/core';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let user = null;
  const sharedS = inject(SharedService);
  const router = inject(Router);

  let result = false;
  sharedS
    .getData()
    .pipe(take(1))
    .subscribe((val: any) => {
      user = val?.businessData?.id;
      if (!user || user.length < 1) {
        result = false;
      } else {
        result = true;
      }
    });

  console.log(result, user);

  if (!result) {
    sharedS.insertData({ key: 'businessData', val: null });
    router.navigateByUrl('/');
  }
  return result;
};
