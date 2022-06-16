import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersFormComponent } from "./users-form/users-form.component";
import { UsersListResolver } from "./users-list/users-list.resolver";
import { UsersFormResolver } from "./users-form/users-form.resolver";

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    resolve: {
      users: UsersListResolver
    }
  },
  {
    path: 'new',
    component: UsersFormComponent
  },
  {
    path: ':id',
    component: UsersFormComponent,
    resolve: {
      user: UsersFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
