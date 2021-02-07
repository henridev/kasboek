"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KasboekRepository = void 0;
const database_1 = require("../../database");
const config_1 = require("../../config");
class KasboekRepository {
    constructor() {
        this.connection = database_1.getConnection();
    }
    async findAll(start, end) {
        try {
            return this.connection
                .select("*")
                .from(config_1.T.KASBOEK)
                .where('datum', '>=', start)
                .where('datum', '<=', end);
        }
        catch (error) {
            throw new Error("failed getting rows");
        }
    }
    async insertEntries(entries) {
        try {
            return this.connection.insert(entries).into(config_1.T.KASBOEK);
        }
        catch (error) {
            throw new Error("failed getting rows");
        }
    }
}
exports.KasboekRepository = KasboekRepository;
exports.default = new KasboekRepository();
//# sourceMappingURL=handler.js.map