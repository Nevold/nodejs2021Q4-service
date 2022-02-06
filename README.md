# RS School REST service

# Nest

### Running application with Nest

**Downloading:**

```sh
git clone {repository URL}
```

**Installing NPM modules:**

```sh
npm ci
```

**Running application (two ways):**

using Docker:

```sh
docker-compose up --build

docker-compose up
```

locally:

```sh
npm run start:dev
```

> Note: don't forget to at least change in file **.env** POSTGRES_HOST to `localhost` and POSTGRES_PASSWORD to `your password base`

**Testing:**

```sh
npm run test:auth
```

**Uploading file:**

> Note: use KEY `file` in form-data

## TEST fastify

| operation                          | value  |
| ---------------------------------- | ------ |
| http.codes.200:                    | 4320   |
| http.codes.201:                    | 1080   |
| http.request_rate:                 | 40/sec |
| http.requests:                     | 5400   |
| http.response_time:                |
| min:                               | 0      |
| max:                               | 319    |
| median:                            | 4      |
| p95:                               | 22     |
| p99:                               | 34.1   |
| http.responses:                    | 5400   |
| vusers.completed:                  | 1080   |
| vusers.created:                    | 1080   |
| vusers.created_by_name.Users test: | 1080   |
| vusers.session_length:             |
| min:                               | 20.2   |
| max:                               | 420.3  |
| median:                            | 43.4   |
| p95:                               | 85.6   |
| p99:                               | 122.7  |

## TEST express

| operation                          | value  |
| ---------------------------------- | ------ |
| http.codes.200:                    | 4348   |
| http.codes.201:                    | 1087   |
| http.request_rate:                 | 41/sec |
| http.requests:                     | 5435   |
| http.response_time:                |
| min:                               | 0      |
| max:                               | 533    |
| median:                            | 6      |
| p95:                               | 22.9   |
| p99:                               | 36.2   |
| http.responses:                    | 5435   |
| vusers.completed:                  | 1087   |
| vusers.created:                    | 1087   |
| vusers.created_by_name.Users test: | 1087   |
| vusers.session_length:             |
| min:                               | 22.9   |
| max:                               | 1132.9 |
| median:                            | 48.9   |
| p95:                               | 90.9   |
| p99:                               | 135.7  |

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Running application with Docker

Downloading: <kbd>git clone {repository URL}</kbd>

Installing NPM modules: <kbd>npm install</kbd>

Running application: <kbd>docker-compose up </kbd> or <kbd>docker-compose up --build</kbd>
