import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProtonLogger } from './models';
import { ProtonLoader } from './models/proton-loader';
import { CONTROLLER_ROUTES, PROTON_CONFIG } from './tokens';
import { ProtonRoute } from './types/proton-route';
import { isPortAvailable, portResolver } from './utils/resolve-port';
import * as fs from 'fs-extra';
import { join } from 'path';
import { createFiles } from './utils/create-files';

export type BootstrapOptions = {
  middlewares: ((req: Request, res: Response, next: NextFunction) => void)[];
  controllers: Function[];
};

export async function bootstrap(
  BootstrapOptions: BootstrapOptions,
  callback?: () => void
) {
  const logger = new ProtonLogger('ProtonApplicationFactory');

  logger.log('Initializing Proton...');

  const loader = new ProtonLoader();
  const { server, config } = await loader.init();

  BootstrapOptions.middlewares.forEach((middleware) => {
    if (config.logs?.middlewares) {
      logger.log(`Using ${middleware.name} middleware`);
    }

    server.use(middleware);
  });

  BootstrapOptions.controllers.forEach((controller) => {
    const routes: ProtonRoute[] = Reflect.getMetadata(
      CONTROLLER_ROUTES,
      controller.prototype
    );

    routes.forEach((route) => {
      if (route.action) {
        if (config.logs?.routes) {
          logger.log(
            `Routing [${route.method.toUpperCase()}] ${route.path}`,
            controller.name
          );
        }
        server[route.method](route.path, route.action);
      } else {
        logger.warn(
          `No action found for ${route.method.toUpperCase()} ${route.path}`,
          controller.name
        );
      }
    });
  });

  const portAvailable = await isPortAvailable(config.port);

  if (!portAvailable) {
    process.stdout.write(
      logger.question(
        `Port ${config.port} is already in use, should Proton use another port? (y/n): `
      )
    );

    const port = await new Promise<number>((resolve, reject) => {
      process.stdin.once('data', async (data) => {
        const answer = data.toString().trim();

        if (answer === 'y') {
          resolve(await portResolver(config.port));
        } else {
          reject();
        }
      });
    }).catch(() => null);

    if (!port) {
      logger.error('Proton failed to start due to port conflict');
      process.exit();
    }

    config.port = port;
  }

  container.registerInstance(PROTON_CONFIG, config);

  const environment = process.env.NODE_ENV || 'development';

  if (!config.environments[environment]) {
    logger.error(`Environment ${environment} not found`);
    process.exit();
  }

  const envFilePathExists = fs.existsSync(
    join(process.cwd(), config.environments[environment].envFile.path)
  );

  if (!envFilePathExists) {
    logger.log(
      `Creating ${config.environments[environment].envFile.path} file...`
    );

    try {
      createFiles([
        {
          path: config.environments[environment].envFile.path,
          content: '',
          cwd: process.cwd()
        }
      ]);
    } catch (e) {
      logger.error(
        `Failed to create ${config.environments[environment].envFile.path} file`
      );

      process.exit();
    }
  }

  server.listen(config.port, () => {
    logger.log(`Proton server is listening on port ${config.port}`);
    callback?.();
  });
}
