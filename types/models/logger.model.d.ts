export declare class ProtonLogger {
    private context;
    constructor(context?: string);
    private write;
    log(message: string, context?: string): void;
    error(message: string, stack?: string, context?: string): void;
    debug(message: string, context?: string): void;
    getContext(context?: string): string;
}
