import Knex from "knex";
import { KasboekEntry } from "../../models/KasboekEntry";
export declare class KasboekRepository {
    connection: Knex<any, unknown[]>;
    constructor();
    findAll(): Promise<KasboekEntry[]>;
    insertEntries(entries: KasboekEntry[]): Promise<any>;
}
