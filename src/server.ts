import {app} from "./app";
import {LoggerService} from "./services/loggerService";
import {findAvailablePort} from "./utils/portFinder";

const PORT: number = parseInt(process.env.PORT ?? "3002", 10);

async function startServer(): Promise<void> {
  try {
    const port = await findAvailablePort(PORT);

    app.listen(port, () => {
      LoggerService.info(`Server start on port ${port}`);
    });
  } catch (error) {
    LoggerService.error('Error during server initialisation', {error});
    process.exit(1);
  }
}

startServer().catch((e) => LoggerService.error('Error during server initialisation', e));
