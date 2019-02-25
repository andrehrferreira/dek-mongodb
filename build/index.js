'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.objectid = exports.mongoclient = undefined;

var _scope = require('@dekproject/scope');

var _mongodb = require('mongodb');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoclient = exports.mongoclient = _mongodb.MongoClient;
var objectid = exports.objectid = _mongodb.ObjectID;

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var dbConfig, env, authUrl, configApproved, connectionUrl, conn, db;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    dbConfig = {};
                    env = process.env;
                    authUrl = null;
                    configApproved = true;

                    // Check the existence of the parameters below in .env

                    if (env.hasOwnProperty('MONGO_USER') || !!env.MONGO_USER) dbConfig['MONGO_USER'] = env.MONGO_USER;

                    if (env.hasOwnProperty('MONGO_PASSWORD') || !!env.MONGO_PASSWORD) dbConfig['MONGO_PASSWORD'] = env.MONGO_PASSWORD;

                    if (env.hasOwnProperty('MONGO_PATH') || !!env.MONGO_PATH) {
                        dbConfig['MONGO_PATH'] = env.MONGO_PATH;
                    } else {
                        if (env.hasOwnProperty('MONGO_HOST') && !!env.MONGO_HOST) dbConfig['MONGO_HOST'] = env.MONGO_HOST;else {
                            configApproved = false;
                            console.log('[ MongoDB Plugin ] - There is no MONGO_HOST variable in the .env file.');
                        }

                        if (env.hasOwnProperty('MONGO_PORT') && !!env.MONGO_PORT) dbConfig['MONGO_PORT'] = env.MONGO_PORT;else {
                            configApproved = false;
                            console.log('[ MongoDB Plugin ] - There is no MONGO_PORT variable in the .env file.');
                        }
                    }

                    if (env.hasOwnProperty('MONGO_DB') && !!env.MONGO_DB) dbConfig['MONGO_DB'] = env.MONGO_DB;else {
                        configApproved = false;
                        console.log('[ MongoDB Plugin ] - There is no MONGO_DB variable in the .env file');
                    }

                    if (dbConfig.hasOwnProperty('MONGO_USER') && !!env.MONGO_USER && dbConfig.hasOwnProperty('MONGO_PASSWORD') && !!env.MONGO_PASSWORD) authUrl = dbConfig.MONGO_USER + ':' + dbConfig.MONGO_PASSWORD + '@';

                    if (configApproved) {
                        _context.next = 15;
                        break;
                    }

                    console.log('[ MongoDB Plugin ] - Please correct the above errors before restarting the application.');
                    process.exit(-1);
                    _context.next = 31;
                    break;

                case 15:
                    if (dbConfig.hasOwnProperty('MONGO_PATH')) connectionUrl = '' + dbConfig['MONGO_PATH'];else connectionUrl = dbConfig['MONGO_HOST'] + ':' + dbConfig['MONGO_PORT'] + '/' + dbConfig['MONGO_DB'];

                    if (authUrl) connectionUrl = '' + authUrl + connectionUrl;

                    _context.prev = 17;
                    _context.next = 20;
                    return _mongodb.MongoClient.connect('mongodb://' + connectionUrl, { useNewUrlParser: true });

                case 20:
                    conn = _context.sent;
                    _context.next = 23;
                    return conn.db(dbConfig['MONGO_DB']);

                case 23:
                    db = _context.sent;


                    if (process.env.PLUGIN_DEBUG == 'true') console.log('[ MongoDB Plugin ] - MongoDB successfully signed');

                    _scope.$.set("mongodb", db);
                    _context.next = 31;
                    break;

                case 28:
                    _context.prev = 28;
                    _context.t0 = _context['catch'](17);

                    console.log('[ MongoDB Plugin ] - ' + _context.t0.message);

                case 31:
                    _context.next = 36;
                    break;

                case 33:
                    _context.prev = 33;
                    _context.t1 = _context['catch'](0);

                    console.log('[ MongoDB Plugin ] - ' + _context.t1.message);

                case 36:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[0, 33], [17, 28]]);
}));
//# sourceMappingURL=index.js.map