import * as Knex from "knex";
import dotenv from "dotenv";
import { T } from "../constants";

dotenv.config();

export async function up(knex: Knex): Promise<any> {
  return knex.schema.withSchema("public").createTable(`${T.KASBOEK}`, (table) => {
    table.increments("id").primary();
    table.timestamp("datum");
    table.float("omzet")
    table.float("cheque_delhaize")
    table.float("tegoebon")
    table.float("publiciteitsbon")
    table.float("leeggoedbon")
    table.float("bancontact")
    table.float("op_krediet")
    table.float("andere")
    table.float("amex")
    table.float("visa")
    table.float("mastercard")
    table.float("maestro")
    table.float("visa_electron")
    table.float("payfair")
    table.float("sodexo")
    table.float("accordenred")
    table.float("som_totaal")
    table.float("verschil")
    table.float("cash")
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.withSchema("public").dropTable(`${T.KASBOEK}`);
}
