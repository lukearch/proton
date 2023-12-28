import { NextFunction, Response } from 'express';
import { ProtonException } from '../models/proton-exception.model';
import { ProtonRequest } from '../types/proton-request';
export declare function protonErrorHandlerMiddleware(): (exception: ProtonException, req: ProtonRequest, res: Response, next: NextFunction) => void;
