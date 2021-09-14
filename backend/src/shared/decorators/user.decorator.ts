import { User } from '../../users/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Usr = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User;
  },
);
