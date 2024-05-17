import { verify } from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { AccessTokenPayload } from '../type/jwtPayload';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async use(req: Request | any, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let token;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      token = verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
      );
    } catch (error) {
      throw new ForbiddenException('Please register or sign in.');
    }
    if (token) {
      req.userId = token.userId;
    }
    next();
  }
}
