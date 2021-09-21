import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@api/users';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailConfirmation(user: User, url: string): Promise<boolean> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'NUSCats Email Confirmation',
      template: './index',
      context: {
        title: 'Email Confirmation',
        username: user.username,
        content: 'Please click below to confirm your email',
        action_url: url,
        action_text: 'Confirm email',
      },
    });

    return true;
  }

  async sendPasswordReset(user: User, url: string): Promise<boolean> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'NUSCats Password Reset',
      template: './index',
      context: {
        title: 'Password reset',
        username: user.username,
        content: 'Please click below to reset your password',
        action_url: url,
        action_text: 'Reset password',
      },
    });

    return true;
  }
}
