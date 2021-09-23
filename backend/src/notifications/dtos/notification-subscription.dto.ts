import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationTopic } from '@api/notifyTopics';

export class NotificationSubscriptionDto {
  /**
   * The target group of users
   * @example /topics/catrequest
   */
  @IsString()
  @IsOptional()
  @IsEnum(NotificationTopic)
  topic?: NotificationTopic = NotificationTopic.CatsRequest;

  /**
   * FCM Notification token
   */
  @IsString()
  token?: string;
}
