import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  private _extractAccessToken(request: Request): string | undefined {
    if (!request.headers?.authorization) {
      throw new UnauthorizedException();
    }

    const [type, token] = request.headers?.authorization?.split(' ');

    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this._extractAccessToken(request);

    return process.env.ADMIN_ACCESS_TOKEN === token;
  }
}
