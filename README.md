# Task - 03 Node.js CRUD API RS School 2024


### Preparations:
1. Clone Repository;
2. Install dependencies

```
    npm install
```
4. Set up `env` variables by creating `.env` file in the root of the project and then copy next:
```
APP_PORT=<your_port_number>
```
3. Start Application
```
    npm run start:dev
```

#### !Warning

- Implemented only development mode.
- Users `id` is not `uuid`!
- By default application starts in `multi` mode.
- Operations data stored in `/db/users.json` file (Don't get the idea how to create independent in memory variable for storing operations data I think it's not critical for education but you should't to like this in production);


### How to use

You can perform next operations as on root your port as on "clusters" instances:

- `get` all users by `http://localhost:<your_env_port_num>/api/users`;
- `get` user by id `.../api/users/:id`
- `post` new user `.../api/users`
```
<!-- POST JSON Example -->
{
    "id": "4",
    "username": "name2",
    "age": 25,
    "hobbies": [
      "fishing"
    ]
}
```
- `delete` user by id `.../api/users/:id`