import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLogger } from './customLogger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly customLogger: CustomLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);

    res.on('finish', async () => {
      const out = `Url: ${req.url}, query: ${query}, body: ${body}, response status: ${res.statusCode}`;

      await this.customLogger.logging(out);
    });

    next();
  }
}
