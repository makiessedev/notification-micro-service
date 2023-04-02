import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create notification', () => {
    const notification = new Notification({
      recipientId: '2332',
      category: 'facebook message',
      content: new Content('recebeu uma nova solicitação de amizade'),
    });

    expect(notification).toBeTruthy();
  });
});
