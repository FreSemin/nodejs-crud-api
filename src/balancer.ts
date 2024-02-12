import http, { IncomingMessage, ServerResponse } from 'node:http';

type ClusterInfo = {
  id: number;
  port: number;
};

export class Balancer {
  private server: http.Server | null = null;

  nextClusterNum: number = -1;
  availableClusters: ClusterInfo[] = [];

  constructor() {
    this.init();
  }

  private init(): void {
    this.server = http.createServer();
    this.server.on(
      'request',
      async (req: IncomingMessage, res: ServerResponse) => {
        const clusterForRequest: ClusterInfo = this.getNextCluster();
        // console.log('cluster.workers: ',);

        console.log('clusterForRequest.port: ', clusterForRequest.port);

        // add port dynamicly
        //
        // if post then headers to set content type
        const options = {
          hostname: 'localhost',
          port: clusterForRequest.port,
          path: req.url,
          method: req.method,
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Content-Length': Buffer.byteLength(postData),
          // },
        };

        const reqRes: {
          data: string;
          headers: http.IncomingHttpHeaders;
          status: number;
        } = await new Promise((resolve, reject) => {
          const workerReq = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });

            res.on('end', () => {
              resolve({
                data: data,
                headers: res.headers,
                status: res.statusCode || 400,
              });
            });
          });

          workerReq.on('error', (error) => {
            reject();
          });

          workerReq.end();
        });

        res.writeHead(reqRes.status, reqRes.headers);
        res.end(reqRes.data);
        // res.end();
      },
    );
  }

  start(port: number): void {
    this.server?.listen(port, () => {
      console.log(`[Server Worker:] Started on port: ${port}`);
    });
  }

  getNextCluster(): ClusterInfo {
    if (this.nextClusterNum + 1 > this.availableClusters.length - 1) {
      this.nextClusterNum = 0;
    } else {
      this.nextClusterNum++;
    }

    return this.availableClusters[this.nextClusterNum];
  }
}
