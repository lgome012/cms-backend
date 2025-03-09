# cms-backend

### Important Module Links - Refer for Documentation

- LOGS - [https://www.npmjs.com/package/winston](https://www.npmjs.com/package/winston)

### Setup Instructions

To start the server, simply run the following command:

```sh
docker-compose up
```

This will spin up all necessary services, including the application and database.

### Running Tests

To execute test cases, run the following command:

```sh
./run_tests.sh
```

### Known Issues

Nothing at the moment :)

### Key Points

- Use proper indentation (4 spaces).
- All (`=`, `:`) signs of variables should align properly.
  - Example:
    ```js
    let variableA = 'hello';
    let variableB = {
        a: 'asd',
        b: 'ssdfdsf',
    };
    ```
- Use camelCase for all variables and filenames. Avoid `_` in names.
- Use promises instead of callbacks.
- Utilize `underscore` library wherever applicable.
- Always define validations when creating a new API.
- Require all dependencies at the top of the file (avoid requiring inside functions).
- Use the logger library (`winston`) for logging responses—no `console.log` statements in committed code.
- When installing new modules, always use `--save-exact`:
  ```sh
  npm install <package-name> --save-exact
  ```
- All `GET` APIs should support pagination (`limit` and `offset`).

### API Documentation

For API references and documentation, visit:

```
http://localhost:3000/api-docs/#/
```