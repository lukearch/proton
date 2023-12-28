import { RequestHandler } from 'express';
import { Method } from './method';

export interface ProtonRoute {
  path: string;
  method: Method;
  propertyKey: string | symbol;
  action?: RequestHandler;
}
