import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationTopic } from '@api/notifyTopics';

export class NotificationCreateDto {
  /**
   * The target group of users
   * @example /topics/catrequest
   */
  @IsString()
  @IsEnum(NotificationTopic)
  topic: NotificationTopic;

  /**
   * Title of notification
   */
  @IsString()
  @IsOptional()
  title?: string;

  /**
   * Body of notification
   */
  @IsString()
  @IsOptional()
  body?: string;
}
