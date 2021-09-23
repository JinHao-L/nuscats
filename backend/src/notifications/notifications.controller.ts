import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { NotificationCreateDto } from './dtos/notification-create.dto';
import { NotificationSubscriptionDto } from './dtos/notification-subscription.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { RoleType } from '@api/users';

@Controller('notify')
export class NotificationsController {
  constructor(private notifyService: NotificationsService) {}

  @ApiCreatedResponse({ description: 'Successfully subscribed' })
  @Post('/subscribe')
  subscribeNotification(
    @Body() subscriptionDto: NotificationSubscriptionDto,
  ): Promise<string> {
    const { token, topic } = subscriptionDto;
    return this.notifyService.subscribe(token, topic).then((response) => {
      if (response.successCount) {
        return 'Successfully subscribed';
      } else {
        console.log(response.errors);
        throw new BadRequestException('Failed to subscribed');
      }
    });
  }

  @ApiCreatedResponse({ description: 'Successfully unsubscribed' })
  @ApiBadRequestResponse({ description: 'Already unsubscribed' })
  @Post('/unsubscribe')
  unsubscribeNotification(
    @Body() subscriptionDto: NotificationSubscriptionDto,
  ): Promise<string> {
    const { token, topic } = subscriptionDto;
    return this.notifyService.unsubscribe(token, topic).then((response) => {
      if (response.successCount) {
        return 'Successfully unsubscribed';
      } else {
        throw new BadRequestException('Already unsubscribed');
      }
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.Admin)
  @ApiCreatedResponse({ description: 'Successfully pushed notification' })
  @Post('/create')
  createNotification(
    @Body() notificationCreateDto: NotificationCreateDto,
  ): Promise<string> {
    const { topic, ...details } = notificationCreateDto;
    return this.notifyService.notify(topic, details).then((response) => {
      if (response.messageId) {
        return 'Successfully pushed notification';
      } else {
        throw new BadRequestException('Failed to pushed notification');
      }
    });
  }
}
