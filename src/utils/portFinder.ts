import * as net from 'net';

/**
 * Checks if a port is available
 * @param port - Port to check
 * @returns True if the port is available, False otherwise
 */
export function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => {
      // If the port is already in use, the error event will be triggered
      resolve(false);
    });

    server.once('listening', () => {
      // Close the server if the port is available
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
}