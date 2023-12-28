import { NextFunction, Response } from 'express';
import { ProtonException } from '../models/proton-exception.model';
import { ProtonRequest } from '../types/proton-request';
import { container } from 'tsyringe';
import { PROTON_LOGGER } from '../tokens';
import { ProtonLogger } from '../models';

export function protonErrorHandlerMiddleware() {
  return (
    exception: ProtonException,
    req: ProtonRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (exception instanceof ProtonException) {
      const logger = container.resolve<ProtonLogger>(PROTON_LOGGER);
      logger.error(
        `[${req.method.toUpperCase()}] ${req.path} - ${exception.message}`,
        exception.stack
      );

      res.status(500).json({
        message: 'Internal server error.',
        stack: exception.stack,
        name: exception.name
      });
    }

    next();
  };
}
