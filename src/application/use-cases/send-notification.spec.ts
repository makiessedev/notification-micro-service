import { InMemoryNotificationsRepository } from '../../../test/repository/in-memory-notification-repository';
import { SendNotification } from './send-notification';

describe('Send-Notification', () => {
  it('should be able to send a notification', async () => {
    const inMemoryNotificationRepository =
      new InMemoryNotificationsRepository();

    const sendNotification = new SendNotification(
      inMemoryNotificationRepository,
    );

    await sendNotification.execute({
      recipientId: '21212',
      category: 'social',
      content: 'recebeu uma solicitação de amizada',
    });

    expect(inMemoryNotificationRepository.notifications).toHaveLength(1);
  });
});
