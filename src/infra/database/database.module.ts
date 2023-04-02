import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repository/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
