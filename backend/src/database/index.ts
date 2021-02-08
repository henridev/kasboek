
import Knex from 'knex';
import {Database} from '../config/index'




export function getConnection() {
    const knex = Knex({
      client: Database.client,
      connection: {
        uri: Database.uri,
        ssl: true,
        user: Database.user,
        password: Database.password,
        host: Database.host,
        port: Database.port,
        database: Database.database,
        timezone: "Europe/Paris",
      },
      pool: {
        min: Database.poolMin,
        max: Database.poolMax,
      },
      acquireConnectionTimeout: 2000,
    });
    return knex;
}