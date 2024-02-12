import http, { IncomingMessage, ServerResponse } from 'node:http';

export class Server {
  private server: http.Server | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.server = http.createServer();
    this.server.on('request', (req: IncomingMessage, res: ServerResponse) => {
      console.log('req.url: ', req.url);
      console.log('res.method: ', req.method);
      res.end('hello');
    });
  }

  start(port: number): void {
    this.server?.listen(port, () => {
      console.log(`start on ${port}`);
    });
  }
}
