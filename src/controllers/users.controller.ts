import { IncomingMessage, ServerResponse } from 'http';
import UsersService from '../services/users.service';

export const findAll = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  // add type
  const users = await UsersService.findAll();

  res.setHeader('Content-Type', 'application/json');
  res.end(users);
};
