import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestsLoggerMiddleware implements NestMiddleware {
  private readonly _logger = new Logger(RequestsLoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, baseUrl } = request;

    response.on('close', () => {
      const { statusCode } = response;

      this._logger.log(`${method} ${baseUrl} ${statusCode}`);
    });

    next();
  }
}
