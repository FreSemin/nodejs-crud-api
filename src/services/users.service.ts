// import { usersMockData } from '../mocks/users.mock';
import path from 'node:path';

import { readFile, writeFile } from 'node:fs/promises';

const getUsersData = async (): Promise<string> => {
  return await readFile(path.join(process.cwd(), 'db', 'users.json'), {
    encoding: 'utf8',
  });
};

const setUsersData = async (data: string): Promise<void> => {
  await writeFile(path.join(process.cwd(), 'db', 'users.json'), data);
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

  async delete(userId: string) {
    const usersData = await getUsersData();

    const users = JSON.parse(usersData);

    const userToDeleteIndex: number = users.findIndex(
      (user: any) => user.id === userId,
    );

    users.splice(userToDeleteIndex, 1);

    await setUsersData(JSON.stringify(users));

    return {};
  }
}

export default UsersService.getInstance();
