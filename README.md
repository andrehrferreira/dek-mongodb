# @dekproject/mongodb

MongoDB interface plugin for DEK

What does this plugin do?

* Control configuration for connection to MongoDB in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ yarn add @dekproject/mongodb --save
$ nano .env
```

In the .env file add the following settings

```
MONGO_USER=
MONGO_PASSWORD=
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=dek
```

For applications with cluster usage in MongoDB

```
MONGO_USER=
MONGO_PASSWORD=
MONGO_PATH=mongodb://mongo-01:27017,mongo-02:27017/dek?replicaSet=dek&readPreference=secondaryPreferred
MONGO_DB=dek
```

## Usage

Using direct

```bash
$ npm i @dekproject/scope
```

Using in the standard DEK skeleton

```js
import { $, app, mongodb } from "@dekproject/scope";

app.get("user", (req, res) => {
    mongodb.users.find({}).toArray((err, docs) => {
        if(err) res.status(500).send(err).end();
        else res.send(docs).end();
    });
});

$.wait("mongodb").then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
```
