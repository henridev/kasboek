import Knex from "knex";
import { KasboekEntry } from "../../models/KasboekEntry";
export declare class KasboekRepository {
    connection: Knex<any, unknown[]>;
    constructor();
    findAll(start: string, end: string): Promise<KasboekEntry[]>;
    insertEntries(entries: KasboekEntry[]): Promise<any>;
}
declare const _default: KasboekRepository;
export default _default;
