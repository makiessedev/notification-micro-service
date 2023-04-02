import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadyNotificationRequest {
  notificationId: string;
}

type ReadyNotificationResponse = void;

@Injectable()
export class ReadyNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadyNotificationRequest,
  ): Promise<ReadyNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.ready();

    await this.notificationsRepository.save(notification);
  }
}
