'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.objectid = exports.mongoclient = undefined;

var _scope = require('@dekproject/scope');

var _mongodb = require('mongodb');

var mongoclient = exports.mongoclient = _mongodb.MongoClient;
var objectid = exports.objectid = _mongodb.ObjectID;

exports.default = function () {
    return new Promise(function (resolve, reject) {
        try {
            var dbConfig = {};
            var env = process.env;
            var authUrl = null;
            var configApproved = true;

            // Check the existence of the parameters below in .env

            if (env.hasOwnProperty('MONGO_USER') || !!env.MONGO_USER) dbConfig['MONGO_USER'] = env.MONGO_USER;

            if (env.hasOwnProperty('MONGO_PASSWORD') || !!env.MONGO_PASSWORD) dbConfig['MONGO_PASSWORD'] = env.MONGO_PASSWORD;

            if (env.hasOwnProperty('MONGO_PATH') || !!env.MONGO_PATH) {
                dbConfig['MONGO_PATH'] = env.MONGO_PATH;
            } else {
                if (env.hasOwnProperty('MONGO_HOST') && !!env.MONGO_HOST) dbConfig['MONGO_HOST'] = env.MONGO_HOST;else {
                    configApproved = false;
                    console.log('[ MongoDB ] - There is no MONGO_HOST variable in the .env file.');
                }

                if (env.hasOwnProperty('MONGO_PORT') && !!env.MONGO_PORT) dbConfig['MONGO_PORT'] = env.MONGO_PORT;else {
                    configApproved = false;
                    console.log('[ MongoDB ] - There is no MONGO_PORT variable in the .env file.');
                }
            }

            if (env.hasOwnProperty('MONGO_DB') && !!env.MONGO_DB) dbConfig['MONGO_DB'] = env.MONGO_DB;else {
                configApproved = false;
                console.log('[ MongoDB ] - There is no MONGO_DB variable in the .env file');
            }

            if (dbConfig.hasOwnProperty('MONGO_USER') && !!env.MONGO_USER && dbConfig.hasOwnProperty('MONGO_PASSWORD') && !!env.MONGO_PASSWORD) authUrl = dbConfig.MONGO_USER + ':' + dbConfig.MONGO_PASSWORD + '@';

            if (!configApproved) {
                console.log('[ MongoDB ] - Please correct the above errors before restarting the application.');
                process.exit(-1);
            } else {
                try {
                    if (dbConfig.hasOwnProperty('MONGO_PATH')) var connectionUrl = '' + dbConfig['MONGO_PATH'];else var connectionUrl = dbConfig['MONGO_HOST'] + ':' + dbConfig['MONGO_PORT'] + '/' + dbConfig['MONGO_DB'];

                    if (authUrl) connectionUrl = '' + authUrl + connectionUrl;

                    _mongodb.MongoClient.connect('mongodb://' + connectionUrl, {
                        useNewUrlParser: true
                    }, function (err, conn) {
                        var db = conn.db(dbConfig['MONGO_DB']);

                        if (process.env.DEBUG == 'true') console.log('[ MongoDB ] - MongoDB successfully signed');

                        _scope.$.set("mongodb", db);
                        resolve();
                    });
                } catch (e) {
                    console.log('[ MongoDB ] - ' + e.message);
                    reject();
                }
            }
        } catch (e) {
            console.log('[ MongoDB ] - ' + e.message);
            reject();
        }
    });
};
//# sourceMappingURL=index.js.map