import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repository/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel-Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification({ recipientId: 'recipient-1' });

    await notificationRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should be able to cancel a no existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
