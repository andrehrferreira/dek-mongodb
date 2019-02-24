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