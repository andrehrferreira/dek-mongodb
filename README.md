# @dek/mongodb

MongoDB interface plugin for DEK

What does this plugin do?

* Control configuration for connection to MongoDB in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project

### Instalation

To install the bootstrap we recommend using the CLI

```bash
$ npm i -g @dek/cli
$ dek install mongodb
```

### Settings

Add connection settings in .env

```
MONGO_USER=
MONGO_PASSWORD=
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=dek
```
