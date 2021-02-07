import Knex from "knex";
import { KasboekEntry } from "../../models/KasboekEntry";
import { getConnection } from "../../database";
import { T } from "../../config";


export class KasboekRepository {
  connection: Knex<any, unknown[]>;

  constructor() {
    this.connection = getConnection();
  }

  async findAll(): Promise<KasboekEntry[]> {
    try {
      return this.connection
        .select("*")
        .from(T.KASBOEK)
    } catch (error) {
      throw new Error("failed getting rows");
    }
  }  
  async insertEntries(entries: KasboekEntry[]): Promise<any> {
    try {
      return this.connection.insert(entries).into(T.KASBOEK)
    } catch (error) {
      throw new Error("failed getting rows");
    }
  }  
}

export default new KasboekRepository()
