import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadyNotification } from '@application/use-cases/ready-notification';
import { UnreadyNotification } from '@application/use-cases/unready-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotifications,
    ReadyNotification,
    UnreadyNotification,
  ],
})
export class HttpModule {}
