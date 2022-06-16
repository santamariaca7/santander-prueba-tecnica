export interface Notification {
  type: NotificationType;
  message?: string;
  delay?: number;
}

export type NotificationType = 'success' | 'error' | 'warning';
