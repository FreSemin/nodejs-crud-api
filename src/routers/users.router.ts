import { IncomingMessage, ServerResponse } from 'http';
import { findAll } from '../controllers/users.controller';

export const usersRouter = (
  req: IncomingMessage,
  res: ServerResponse,
): void => {
  // parse
  // add type
  const parsedUrl = req.url;

  // console.log('parsedUrl: ', parsedUrl);

  switch (parsedUrl) {
    case '/users':
      // console.log('users');
      // res.end('users');
      findAll(req, res);
      break;

    case '/users/id':
      // console.log('users');
      res.end('users/id');
      break;

    default:
      res.statusCode = 400;
      res.end('not existing path');
      break;
  }
};
