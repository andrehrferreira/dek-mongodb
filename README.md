# @dek/mongodb

MongoDB interface plugin for DEK

What does this plugin do?

* Control configuration for connection to MongoDB in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ npm i -g @dekproject/cli
$ dek install mongodb
```

or

```bash
$ npm i -g @dekproject/mongodb
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

## Settings

Add connection settings in .env

```
MONGO_USER=
MONGO_PASSWORD=
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=dek
```

## Usage

Using direct

```js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { $ } from "@dekproject/scope";
import mongodb from "../src/index.js";

(async () => {
    dotenv.config({ path: "./sample/.env" });
    await mongodb();

    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const PORT = process.env.PORT || 5555;

    app.get("/user", (req, res) => {
        $.mongodb.collection("users").find({}).toArray((err, docs) => {
            if(err) res.status(500).send(err).end();
            else res.send(docs).end();
        });
    });

    app.post("/user", (req, res) => {
        $.mongodb.collection("users").insert(req.body, (err, result) => {
            if(err) res.status(500).send(err).end();
            else res.send(result).end();
        });
    });

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
})();

```

Using in the standard DEK skeleton

```js
import { app, mongodb } from "@dekproject/scope";

app.get("user", (req, res) => {
    mongodb.users.find({}).toArray((err, docs) => {
        if(err) res.status(500).send(err).end();
        else res.send(docs).end();
    });
});
```
