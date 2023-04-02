import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repository/in-memory-notification-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count-Notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
