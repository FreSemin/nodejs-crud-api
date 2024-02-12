import { Server } from './server';
import * as dotenv from 'dotenv';

dotenv.config();

const appServer: Server = new Server();

const serverPort: number = Number(process.env.APP_PORT) || 3000;

appServer.start(serverPort);
