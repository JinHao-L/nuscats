import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl: url, body } = req;

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;

      this.logger.log(
        `\n${method} ${url} \n  Response Status: ${statusCode} ${statusMessage}\n`,
      );
    });
    next();
  }
}
