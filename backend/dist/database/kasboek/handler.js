"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KasboekRepository = void 0;
const __1 = require("..");
const config_1 = require("../../config");
class KasboekRepository {
    constructor() {
        this.connection = __1.getConnection();
    }
    async findAll() {
        try {
            return this.connection
                .select("*")
                .from(config_1.T.KASBOEK);
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
//# sourceMappingURL=handler.js.map