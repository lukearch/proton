import { Request } from 'express';
export interface ProtonRequest extends Request {
    storage: Map<string, unknown>;
    get: <T>(key: string) => T;
    set: (key: string, value: unknown) => void;
}
