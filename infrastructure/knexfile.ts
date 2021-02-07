import dotenv from "dotenv";
import Knex from "knex";

dotenv.config();

console.log('process.env', process.env)
const config: Knex.Config = {
  client: "pg",
  connection: {
    ssl:true,
    uri: process.env.pg_uri,
    user: process.env.pg_user,
    password: process.env.pg_password,
    host: process.env.pg_host,
    port: Number(process.env.pg_port),
    database: process.env.pg_db,
  },
  pool: {
    min: 0,
    max: 100,
  },
  migrations: {
    tableName: "KnexMigrations",
    directory: "migrations",
    schemaName: "public",
  },

};


module.exports = config;
