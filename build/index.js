'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scope = require('@dekproject/scope');

var _mongodb = require('mongodb');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var dbConfig, env, authUrl, configApproved, connectionUrl, mongoClient, db, conn, _db;

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

                    if (env.hasOwnProperty('MONGO_HOST') && !!env.MONGO_HOST) dbConfig['MONGO_HOST'] = env.MONGO_HOST;else {
                        configApproved = false;
                        console.log('[ MongoDB Plugin ] - There is no MONGO_HOST variable in the .env file.');
                    }

                    if (env.hasOwnProperty('MONGO_PORT') && !!env.MONGO_PORT) dbConfig['MONGO_PORT'] = env.MONGO_PORT;else {
                        configApproved = false;
                        console.log('[ MongoDB Plugin ] - There is no MONGO_PORT variable in the .env file.');
                    }

                    if (env.hasOwnProperty('MONGO_DB') && !!env.MONGO_DB) dbConfig['MONGO_DB'] = env.MONGO_DB;else {
                        configApproved = false;
                        console.log('[ MongoDB Plugin ] - There is no MONGO_DB variable in the .env file');
                    }

                    if (dbConfig.hasOwnProperty('MONGO_USER') && !!env.MONGO_USER && dbConfig.hasOwnProperty('MONGO_PASSWORD') && !!env.MONGO_PASSWORD) authUrl = dbConfig.MONGO_USER + ':' + dbConfig.MONGO_PASSWORD + '@';

                    if (configApproved) {
                        _context.next = 16;
                        break;
                    }

                    console.log('[ MongoDB Plugin ] - Please correct the above errors before restarting the application.');
                    process.exit(-1);
                    _context.next = 33;
                    break;

                case 16:
                    connectionUrl = dbConfig['MONGO_HOST'] + ':' + dbConfig['MONGO_PORT'] + '/' + dbConfig['MONGO_DB'];


                    if (authUrl) connectionUrl = '' + authUrl + connectionUrl;

                    mongoClient = null, db = null;
                    _context.prev = 19;
                    _context.next = 22;
                    return _mongodb.MongoClient.connect('mongodb://' + connectionUrl, { useNewUrlParser: true });

                case 22:
                    conn = _context.sent;
                    _context.next = 25;
                    return conn.db(dbConfig['MONGO_DB']);

                case 25:
                    _db = _context.sent;


                    if (process.env.PLUGIN_DEBUG == 'true') console.log('[ MongoDB Plugin ] - MongoDB successfully signed');

                    _scope.$.set("mongodb", _db);
                    _context.next = 33;
                    break;

                case 30:
                    _context.prev = 30;
                    _context.t0 = _context['catch'](19);

                    console.log('[ MongoDB Plugin ] - ' + _context.t0.message);

                case 33:
                    _context.next = 38;
                    break;

                case 35:
                    _context.prev = 35;
                    _context.t1 = _context['catch'](0);

                    console.log('[ MongoDB Plugin ] - ' + _context.t1.message);

                case 38:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[0, 35], [19, 30]]);
}));
//# sourceMappingURL=index.js.map