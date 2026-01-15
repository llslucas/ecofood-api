import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from 'src/auth/jwt.strategy';

interface RequestPayload extends Request {
  user: AuthenticatedUser;
}

export const CurrentUser = createParamDecorator(
  (_data, context): AuthenticatedUser => {
    const request = context.switchToHttp().getRequest<RequestPayload>();
    return request.user;
  },
);
