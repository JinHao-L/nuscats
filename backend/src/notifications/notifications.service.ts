import { NotificationCreateDto } from './dtos/notification-create.dto';
import { FirebaseConfigService } from './../config/firebase.config';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { NotificationTopic } from '@api/notifyTopics';

@Injectable()
export class NotificationsService {
  constructor(private configService: FirebaseConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(configService.values),
    });
  }

  notify(
    topic: NotificationTopic,
    notification: Omit<NotificationCreateDto, 'topic'>,
  ) {
    return admin.messaging().sendToTopic(
      topic,
      { data: notification },
      {
        timeToLive: 86400, // 1 day
      },
    );
  }

  unsubscribe(token: string, topic: NotificationTopic) {
    return admin.messaging().unsubscribeFromTopic(token, topic);
  }

  subscribe(token: string, topic: NotificationTopic) {
    return admin.messaging().subscribeToTopic(token, topic);
  }
}
