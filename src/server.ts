import http, { IncomingMessage, ServerResponse } from 'node:http';
import { router } from './routers/index.router';

export class Server {
  private server: http.Server | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.server = http.createServer();
    this.server.on('request', (req: IncomingMessage, res: ServerResponse) => {
      router(req, res);
    });
  }

  start(port: number): void {
    this.server?.listen(port, () => {
      console.log(`[Server:] Started on port: ${port}`);
    });
  }
}
