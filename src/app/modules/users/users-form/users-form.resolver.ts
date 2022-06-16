import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from "../../../core/services/users.service";
import { User } from "../../../core/models/user";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersFormResolver implements Resolve<User> {
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.usersService.getUser((route.params as any).id).pipe(
      catchError(() => {
        this.router.navigate(['/users']);
        return of();
      })
    );
  }
}
