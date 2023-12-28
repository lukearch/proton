import { NextFunction, Request, Response } from 'express';
export type BootstrapOptions = {
    middlewares: ((req: Request, res: Response, next: NextFunction) => void)[];
    controllers: Object[];
};
export declare function bootstrap(BootstrapOptions: BootstrapOptions, callback?: () => void): Promise<void>;
