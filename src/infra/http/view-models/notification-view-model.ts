import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      canceledAt: notification.canceledAt,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}
