import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailConfigService } from 'src/config/mail.config';
import { AppConfigModule } from 'src/config/config.module';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: ({ host, port, user, pass, from }: MailConfigService) => ({
        transport: {
          host,
          port,
          secure: false, // upgrade later with STARTTLS
          auth: { user, pass },
        },
        defaults: {
          from: `NUSCats Team" <${from}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      imports: [AppConfigModule],
      inject: [MailConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
