import { Server } from './server';
import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { Balancer } from './balancer';

const numCPUs = availableParallelism();

dotenv.config();

const port = Number(process.env.APP_PORT) || 3000;
const portForClusters = 3001;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  const balancer: Balancer = new Balancer();

  balancer.start(port);

  for (let i = 0; i < numCPUs; i++) {
    const serverClusterPort = portForClusters + i;

    const serverCluster = cluster.fork({ port: serverClusterPort });

    balancer.availableClusters.push({
      id: serverCluster.id,
      port: serverClusterPort,
    });
  }
} else {
  const workerServer: Server = new Server();

  const serverPort: number = Number(process.env.port) || 3000;

  console.log(`Worker ${process.pid} started`);

  workerServer.start(serverPort);
}
