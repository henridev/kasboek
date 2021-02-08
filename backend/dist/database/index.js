"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const knex_1 = __importDefault(require("knex"));
const index_1 = require("../config/index");
function getConnection() {
    const knex = knex_1.default({
        client: index_1.Database.client,
        connection: {
            uri: index_1.Database.uri,
            ssl: true,
            user: index_1.Database.user,
            password: index_1.Database.password,
            host: index_1.Database.host,
            port: index_1.Database.port,
            database: index_1.Database.database,
            timezone: "Europe/Paris",
        },
        pool: {
            min: index_1.Database.poolMin,
            max: index_1.Database.poolMax,
        },
        acquireConnectionTimeout: 2000,
    });
    return knex;
}
exports.getConnection = getConnection;
//# sourceMappingURL=index.js.map