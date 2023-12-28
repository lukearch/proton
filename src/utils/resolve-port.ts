import * as net from 'net';
import { ProtonLogger } from '../models';

export const isPortAvailable = async (port: number): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const server = net.createServer();

    server.once('error', () => {
      resolve(false);
    });

    server.once('listening', () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
};

export async function portResolver(port: number): Promise<number> {
  const available = await isPortAvailable(port);

  if (available) {
    return port;
  }

  const logger = new ProtonLogger(portResolver.name);

  logger.warn(`Port ${port} is not available, trying ${port + 1}`);

  return portResolver(port + 1);
}
