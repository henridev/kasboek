import { config } from 'dotenv';
import path from "path";

config({ path: path.join(__dirname, "../../.env") })

export namespace Database {
  export const uri = process.env.pg_uri;
  export const client = "pg";
  export const schema = "public";
  export const database = process.env.pg_db;
  export const user = process.env.pg_user || "postgres";
  export const password = process.env.pg_password || "postgres";
  export const hostname = process.env.pg_host || "localhost";
  export const host = process.env.pg_host || "localhost";
  export const port = Number(process.env.pg_port || "5433");
  export const poolMin = Number(process.env.DATABASE_POOL_MIN || "0");
  export const poolMax = Number(process.env.DATABASE_POOL_MAX || "100");
  export const timezone = "Europe/Paris";
  export const migration_dir =
    process.env.DATABASE_MIGRATION_DIR || "migrations";
  export const seed_dir = process.env.DATABASE_SEED_DIR || "seeds";
}

export enum T {
  SCHEMA = "public",
  KASBOEK = "T_KASBOEK",
  SERVICE = "T_SERVICE",
}
