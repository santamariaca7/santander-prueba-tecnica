import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../../core/models/user";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../../../core/services/users.service";
import { FormControl } from "@angular/forms";
import { debounceTime, map, Subject, takeUntil } from "rxjs";
import { NotificationsService } from "../../../core/services/notifications.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  filter: FormControl;
  currentPage = 0;
  pageSize = 10;
  confirmDelete = false;
  selectedUser: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({users}) => {
      this.users = users;
      this.filteredUsers = users.slice();
    });

    this.filter = new FormControl('');
    this.filter.valueChanges.pipe(
      debounceTime(300),
      map(filter => {
        this.currentPage = 0;
        if (!filter) {
          return this.users;
        }
        const filterLowerCase = filter.toLowerCase();
        return this.users.filter(user => Object.values(user).join('\n').toLowerCase().includes(filterLowerCase));
      }),
      takeUntil(this._unsubscribeAll)
    ).subscribe(users => this.filteredUsers = users);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
  }

  changePage(action: number): void {
    const firstItem = (this.currentPage + action) * this.pageSize + 1;
    if (firstItem > 0 && firstItem <= this.users.length) {
      this.currentPage += action;
    }
  }


  confirmDeleteUser(user: User) {
    this.confirmDelete = true;
    this.selectedUser = user;
  }

  deleteUser(action: boolean) {
    this.confirmDelete = false;
    if (action) {
      this.usersService.deleteUser(this.selectedUser.id).subscribe(() => {
        this.usersService.getUsers().subscribe(users => {
          this.users = users;
          this.filter.updateValueAndValidity();
          this.notificationsService.show({message: 'Usuario eliminado', type: 'success'});
        });
      });
    }
  }
}
