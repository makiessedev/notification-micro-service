import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repository/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadyNotification } from './ready-notification';

describe('Ready-Notification', () => {
  it('should be able to ready a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const readylNotification = new ReadyNotification(notificationRepository);

    const notification = makeNotification({ recipientId: 'recipient-1' });

    await notificationRepository.create(notification);
    await readylNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should be able to ready a no existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readylNotification = new ReadyNotification(notificationRepository);

    expect(() => {
      return readylNotification.execute({
        notificationId: 'fake notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
