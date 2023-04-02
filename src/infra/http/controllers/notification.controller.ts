import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadyNotification } from '@application/use-cases/ready-notification';
import { UnreadyNotification } from '@application/use-cases/unready-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notification';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readyNotification: ReadyNotification,
    private unreadyNotification: UnreadyNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch(':id/ready')
  async ready(@Param('id') id: string) {
    await this.readyNotification.execute({ notificationId: id });
  }

  @Patch(':id/unready')
  async unready(@Param('id') id: string) {
    await this.unreadyNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { Notification: NotificationViewModel.toHttp(notification) };
  }
}
