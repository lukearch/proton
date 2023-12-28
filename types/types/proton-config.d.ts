export type ProtonConfig = {
    port: number;
    logs: {
        exceptions: boolean;
        middlewares: boolean;
    };
    serverOptions: {
        useDefaultErrorHandler: boolean;
    };
    protonOptions: {
        middlewares: {
            context: boolean;
            errorHandler: boolean;
        };
    };
    environments: {
        [key: string]: {
            envFile: {
                path: string;
                validate?: boolean;
                schema?: {
                    [key: string]: {
                        type: 'string' | 'number' | 'boolean';
                        required: boolean;
                        default?: string | number | boolean;
                    };
                } | object;
                schemaValidationFactory?: (env: object) => boolean;
            };
        };
    };
};
