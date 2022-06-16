import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../../core/services/users.service";
import { WhiteSpaceValidator } from "../../../shared/validators/whitespace.validator";
import { NotificationsService } from "../../../core/services/notifications.service";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  id: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.activatedRoute.data.subscribe(({user}) => {
      if (user) {
        this.form.patchValue(user);
        this.id = user.id;
      }
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      id: ['', []],
      name: ['', [WhiteSpaceValidator.noWhiteSpace, Validators.required, Validators.minLength(3)]],
      email: ['', [WhiteSpaceValidator.noWhiteSpace, Validators.required, Validators.email]],
      street: ['', [WhiteSpaceValidator.noWhiteSpace, Validators.required]],
      postalCode: ['', [WhiteSpaceValidator.noWhiteSpace, Validators.required, Validators.pattern(/^\d{5}$/)]],
      no: ['', [WhiteSpaceValidator.noWhiteSpace, Validators.required]],
      city: ['', [WhiteSpaceValidator.noWhiteSpace, Validators.required]],
    });
  }

  submit(): void {
    if (this.form.valid) {
      if (this.id) {
        this.usersService.updateUser(this.id, this.form.getRawValue()).subscribe(() => {
          this.notificationsService.show({message: 'Usuario actualizado', type: 'success'});
          this.router.navigate(['users']);
        });
      } else {
        this.usersService.createUser(this.form.getRawValue()).subscribe(() => {
          this.notificationsService.show({message: 'Usuario creado', type: 'success'});
          this.router.navigate(['users']);
        });
      }
    }
  }
}
