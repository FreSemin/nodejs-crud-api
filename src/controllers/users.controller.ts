import { IncomingMessage, ServerResponse } from 'http';
import UsersService from '../services/users.service';

// export class

// add return type
export const findAll = (req: IncomingMessage, res: ServerResponse) => {
  // service find all
  // add type
  const users = UsersService.findAll();

  res.end(JSON.stringify(users));
};
