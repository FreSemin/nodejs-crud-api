import { IncomingMessage, ServerResponse } from 'http';
import UsersService from '../services/users.service';

export const findAll = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  // add type
  const users = await UsersService.findAll();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(users);
};

export const findOne = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
): Promise<void> => {
  // add type
  const user = await UsersService.findOne(userId);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(user);
};

export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
): Promise<void> => {
  await UsersService.delete(userId);

  res.statusCode = 204;
  res.end('ok');
};

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<any> => {
  const newUser = await new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      resolve(await UsersService.createUser(body));
    });
  });

  res.statusCode = 201;
  res.setHeader('Content-Type', 'application/json');
  res.end(newUser);
};
