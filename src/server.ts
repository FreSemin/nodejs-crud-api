import http, { IncomingMessage, ServerResponse } from 'node:http';

export class Server {
  private server: http.Server | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.server = http.createServer();
  }

  start(port: number): void {
    this.server?.listen(port, () => {
      console.log(`[Server:] Started on port: ${port}`);
    });
  }
}
