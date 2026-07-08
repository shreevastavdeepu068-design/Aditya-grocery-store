export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

export interface CreateNotificationPayload {
  title: string;
  message: string;
  type: NotificationType;
}

export interface NotificationResponse {
  success: boolean;
  notification?: Notification;
  message?: string;
}
