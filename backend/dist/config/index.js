"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.T = exports.Database = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.join(__dirname, "../../.env") });
var Database;
(function (Database) {
    Database.uri = process.env.pg_uri;
    Database.client = "pg";
    Database.schema = "public";
    Database.database = process.env.pg_db;
    Database.user = process.env.pg_user || "postgres";
    Database.password = process.env.pg_password || "postgres";
    Database.hostname = process.env.pg_host || "localhost";
    Database.host = process.env.pg_host || "localhost";
    Database.port = Number(process.env.pg_port || "5433");
    Database.poolMin = Number(process.env.DATABASE_POOL_MIN || "0");
    Database.poolMax = Number(process.env.DATABASE_POOL_MAX || "100");
    Database.timezone = "Europe/Paris";
    Database.migration_dir = process.env.DATABASE_MIGRATION_DIR || "migrations";
    Database.seed_dir = process.env.DATABASE_SEED_DIR || "seeds";
})(Database = exports.Database || (exports.Database = {}));
var T;
(function (T) {
    T["SCHEMA"] = "public";
    T["KASBOEK"] = "T_KASBOEK";
    T["SERVICE"] = "T_SERVICE";
})(T = exports.T || (exports.T = {}));
//# sourceMappingURL=index.js.map