import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from "../../../core/services/users.service";
import { User } from "../../../core/models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersListResolver implements Resolve<User[]> {
  constructor(
    private usersService: UsersService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.usersService.getUsers();
  }
}
