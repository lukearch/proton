import { NextFunction, Response } from 'express';
import { ProtonRequest } from '../types/proton-request';
export declare function protonContextMiddleware(): (req: ProtonRequest, _: Response, next: NextFunction) => void;
