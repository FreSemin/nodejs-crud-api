import { IncomingMessage, ServerResponse } from 'http';
import * as usersController from '../controllers/users.controller';

enum reqMethods {
  GET = 'GET',
  DELETE = 'DELETE',
  POST = 'POST',
}

const parseUsersUrl = (url: string = ''): string[] => {
  return url.split('/').filter((path) => path !== '');
};

export const usersRouter = (
  req: IncomingMessage,
  res: ServerResponse,
): void => {
  const parsedUrl = parseUsersUrl(req.url);

  switch (req.method) {
    case reqMethods.GET: {
      // TODO: validate uuid
      // Check is ID exists
      if (parsedUrl[2]) {
        usersController.findOne(req, res, parsedUrl[2]);
      } else {
        usersController.findAll(req, res);
      }
      break;
    }

    case reqMethods.POST: {
      usersController.createUser(req, res);

      break;
    }

    case reqMethods.DELETE: {
      if (parsedUrl[2]) {
        usersController.deleteUser(req, res, parsedUrl[2]);
      }
      break;
    }

    default:
      res.statusCode = 404;
      res.end('Requested path not exists');
      break;
  }
};
