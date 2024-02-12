// import { usersMockData } from '../mocks/users.mock';
import path from 'node:path';

import { readFile } from 'node:fs/promises';

const getUsersData = async () => {
  return await readFile(path.join(process.cwd(), 'db', 'users.json'), {
    encoding: 'utf8',
  });
};

class UsersService {
  private static instance: UsersService;

  constructor() {}

  static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }

    return UsersService.instance;
  }

  async findAll() {
    return await getUsersData();
  }
}

export default UsersService.getInstance();
