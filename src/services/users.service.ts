import { usersMockData } from '../mocks/users.mock';

// make it singlton
class UsersService {
  private static instance: UsersService;

  // add type
  private data;

  constructor() {
    this.data = usersMockData;
  }

  static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }

    return UsersService.instance;
  }

  findAll() {
    return this.data;
  }
}

export default UsersService.getInstance();
