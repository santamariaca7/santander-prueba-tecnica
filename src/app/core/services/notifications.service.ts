import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Notification } from "../components/notifications/notifications.types";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notification: Notification | null = null;
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  private closeTimeout: any;

  constructor() {
  }

  show(message: Notification): void {
    this.notification = message;
    this.notificationSubject.next(this.notification);
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    this.closeTimeout = setTimeout(() => {
      this.notification = null;
      this.notificationSubject.next(this.notification);
    }, message.delay || 3000);
  }

  getNotification(): Observable<Notification | null> {
    return this.notificationSubject.asObservable();
  }
}
