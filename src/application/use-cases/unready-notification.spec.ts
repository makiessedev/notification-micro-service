import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repository/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadyNotification } from './unready-notification';

describe('Unready-Notification', () => {
  it('should be able to unready a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const unreadylNotification = new UnreadyNotification(
      notificationRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);
    await unreadylNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should be able to ready a no existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadylNotification = new UnreadyNotification(
      notificationRepository,
    );

    expect(() => {
      return unreadylNotification.execute({
        notificationId: 'fake notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
