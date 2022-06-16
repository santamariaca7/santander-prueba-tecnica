import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "../../services/notifications.service";
import { Notification } from "./notifications.types";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notification: Notification | null;

  constructor(
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.notificationsService.getNotification()
      .subscribe(notification => this.notification = notification)
  }
}
