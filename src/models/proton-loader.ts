import express from 'express';
import * as fs from 'fs-extra';
import { join } from 'path';
import { container } from 'tsyringe';
import { PROTON_CONFIG, PROTON_SERVER } from '../tokens';
import { ProtonConfig } from '../types';
import { createFiles } from '../utils/create-files';
import { ProtonLogger } from './logger.model';

export class ProtonLoader {
  private readonly logger = new ProtonLogger(ProtonLoader.name);

  async init() {
    const config = await this.loadConfig();
    const server = this.createExpressServer();
    return { server, config };
  }

  private async loadConfig(): Promise<ProtonConfig> {
    if (!fs.existsSync(join(process.cwd(), 'proton.config.js'))) {
      this.logger.log('No proton.config.js found. Creating one...');

      try {
        createFiles([
          {
            path: 'proton.config.js',
            cwd: process.cwd(),
            content: fs.readFileSync('../../proton.config.js').toString()
          }
        ]);
      } catch (e) {
        if (e instanceof Error) {
          this.logger.error(e.message);
          process.exit(1);
        }
      }
    }

    const config = await import(join(process.cwd(), 'proton.config.js')).then(
      (m) => m.default
    );

    container.register<ProtonConfig>(PROTON_CONFIG, {
      useValue: config
    });

    this.logger.log('Proton config loaded.');

    return config;
  }

  private createExpressServer() {
    const app = express();

    container.register<express.Application>(PROTON_SERVER, {
      useValue: app
    });

    return app;
  }
}
