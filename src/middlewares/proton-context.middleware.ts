import { NextFunction, Response } from 'express';
import { UndefinedContextException } from '../exceptions/proton-exceptions/undefined-context-exception.exception';
import { ProtonRequest } from '../types/proton-request';

export function protonContextMiddleware() {
  return (req: ProtonRequest, _: Response, next: NextFunction): void => {
    req.storage = new Map<string, unknown>();
    req.get = <T>(key: string) => {
      const value = req.storage.get(key);

      if (!value) {
        throw new UndefinedContextException(key);
      }

      return value as T;
    };

    req.set = (key: string, value: unknown) => req.storage.set(key, value);

    return next();
  };
}
