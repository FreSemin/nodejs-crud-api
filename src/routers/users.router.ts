import { IncomingMessage, ServerResponse } from 'http';
import { findAll } from '../controllers/users.controller';

enum reqMethods {
  GET = 'GET',
}

const parseUsersUrl = (url: string = ''): string[] => {
  return url.split('/').filter((path) => path !== '');
};

export const usersRouter = (
  req: IncomingMessage,
  res: ServerResponse,
): void => {
  const parsedUrl = parseUsersUrl(req.url);

  if (req.method === reqMethods.GET) {
    // TODO: validate uuid
    // Check is ID exists
    if (parsedUrl[2]) {
      // TODO: get user by id
    } else {
      findAll(req, res);
    }
  }
};
