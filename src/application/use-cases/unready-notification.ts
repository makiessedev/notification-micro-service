import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadyNotificationRequest {
  notificationId: string;
}

type UnreadyNotificationResponse = void;

@Injectable()
export class UnreadyNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadyNotificationRequest,
  ): Promise<UnreadyNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unready();

    await this.notificationsRepository.save(notification);
  }
}
