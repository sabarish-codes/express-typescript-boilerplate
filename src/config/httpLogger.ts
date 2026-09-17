import { pinoHttp } from 'pino-http';
import pino from 'pino';
import { logger } from './logger';

export const httpLogger = pinoHttp({
  logger,
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
});
