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

/**
 * Finds an available port starting from a base port
 * @param startPort - Starting port (default 3000)
 * @param maxAttempts - Maximum number of attempts (default 100)
 * @returns Available port found
 */
export async function findAvailablePort(startPort = 3000, maxAttempts = 100): Promise<number> {
  let port = startPort;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const isAvailable = await isPortAvailable(port);
    if (isAvailable) {
      return port;
    }

    port++;
    attempts++;
  }

  throw new Error(`No available port found starting after ${maxAttempts} attempts`);
}