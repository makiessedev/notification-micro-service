import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'examplo-of-recipientid-2',
    category: 'social',
    content: new Content('new notification'),
    ...override,
  });
}
