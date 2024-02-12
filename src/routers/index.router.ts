import { IncomingMessage, ServerResponse } from 'http';
import { usersRouter } from './users.router';

const getReqRoute = (path?: string) => {
  if (!path) {
    return '';
  }

  if (path.startsWith('/api/users')) {
    return 'users';
  }
};

export const router = (req: IncomingMessage, res: ServerResponse): void => {
  const reqRoute = getReqRoute(req.url);
  
  switch (reqRoute) {
    case 'users':
      usersRouter(req, res);
      break;

    default:
      res.statusCode = 400;
      res.end('not existing path');
      break;
  }
};
