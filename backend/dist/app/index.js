"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const kasboek_1 = __importDefault(require("../routes/kasboek"));
const app = express_1.default();
app.use(cors_1.default({
    origin: (origin, cb) => {
        cb(null, process.env.NODE_ENV !== "production");
    },
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(morgan_1.default("dev"));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../../frontend/public")));
app.use("/api/kasboek", kasboek_1.default);
app.use("/api/*", (req, res, next) => {
    let err = new Error("Not Found");
    next(err);
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../../frontend/public/index.html"));
});
// Error handler
app.use((err, _req, res) => {
    console.error("----- An error happened -----");
    console.error(err);
    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
        res.status(500);
        // A limited amount of information sent in production
        if (process.env.NODE_ENV === "production")
            res.json(err);
        else
            res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))));
    }
});
exports.default = app;
//# sourceMappingURL=index.js.map