"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = __importDefault(require("./handler"));
const router = express_1.Router();
router.get("*", async (req, res, next) => {
    const data = await handler_1.default.findAll(req.query.start, req.query.end);
    return res.json(data);
});
router.post("*", async (req, res, next) => {
    await handler_1.default.insertEntries(req.body);
    return res.send("success");
});
exports.default = router;
//# sourceMappingURL=index.js.map