export type ProtonConfig = {
  port: number;
  logs: {
    exceptions: boolean;
    middlewares: boolean;
    routes: boolean;
  };
  environments: {
    [key: string]: {
      envFile: {
        path: string;
        validate?: boolean;
        schema?:
          | {
              [key: string]: {
                type: 'string' | 'number' | 'boolean';
                required: boolean;
                default?: string | number | boolean;
              };
            }
          | object;
        schemaValidationFactory?: (env: object) => boolean;
      };
    };
  };
};
