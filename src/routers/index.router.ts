import { IncomingMessage, ServerResponse } from 'http';
import { usersRouter } from './users.router';

export const router = (req: IncomingMessage, res: ServerResponse): void => {
  // parse
  // add type
  const parsedUrl = req.url;

  console.log('parsedUrl: ', parsedUrl);

  switch (parsedUrl) {
    // start with?
    case '/users':
      usersRouter(req, res);

      // console.log('users');
      // res.end('users');
      break;

    default:
      res.statusCode = 400;
      res.end('not existing path');
      break;
  }
};
