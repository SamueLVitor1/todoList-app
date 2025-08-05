import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const token = storage.getItem<string>('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};