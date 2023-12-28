export declare class ProtonLoader {
    private readonly logger;
    init(): Promise<import("express-serve-static-core").Express>;
    private loadConfig;
    private createExpressServer;
    private loadProtonMiddlewares;
}
