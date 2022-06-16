import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.api}api/users`).pipe(
      map(response => response.map(user => ({
        ...user,
        address: [user.street, user.no, user.postalCode, user.city].join(' ')
      })))
    );
  }

  getUser(id: string): Observable<User> {
    return this._http.get<User>(`${environment.api}api/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this._http.post<User>(`${environment.api}api/users`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this._http.put<User>(`${environment.api}api/users/${id}`, user);
  }

  deleteUser(id: string): Observable<User> {
    return this._http.delete<User>(`${environment.api}api/users/${id}`);
  }
}
