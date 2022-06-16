import { Injectable } from '@angular/core';
import { users } from './data';
import { MockApiService, MockApiUtils } from "../../lib";
import { User } from "../../../core/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserMockApi {
  private _users: any = users.map(user => ({...user, id: MockApiUtils.guid()}));

  /**
   * Constructor
   */
  constructor(private mockApiService: MockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    this.mockApiService
      .onGet('api/users', 3000)
      .reply(() => [200, this._users]);

    this.mockApiService
      .onGet('api/users/:id', 3000)
      .reply(({request}) => {
        const id = request.url.replace(/^.*\/([^\/]+)$/, '$1');
        const user = this._users.find((user: User) => user.id === id);
        if (!user) {
          return [404, {error: 'Usuario no encontrado'}];
        }
        return [200, user]
      });

    this.mockApiService
      .onPost('api/users', 3000)
      .reply(({request}) => {
        const user = {
          ...request.body,
          id: MockApiUtils.guid()
        };
        this._users.push(user);
        return [200, user];
      });

    this.mockApiService
      .onPut('api/users/:id', 3000)
      .reply(({request}) => {
        const id = request.url.replace(/^.*\/([^\/]+)$/, '$1');
        const userIndex = this._users.findIndex((user: User) => user.id === id);
        if (this._users[userIndex]) {
          const user = {
            ...request.body,
            id
          };
          this._users[userIndex] = user;
          return [200, user];
        }
        return [404, {error: 'Usuario no encontrado'}];
      });

    this.mockApiService
      .onDelete('api/users/:id', 300)
      .reply(({request}) => {
        const id = request.url.replace(/^.*\/([^\/]+)$/, '$1');
        const userIndex = this._users.findIndex((user: User) => user.id === id);
        if (this._users[userIndex]) {
          this._users.splice(userIndex, userIndex + 1);
          return [200, this._users[userIndex]];
        }
        return [404, {error: 'Usuario no encontrado'}];
      });
  }
}
