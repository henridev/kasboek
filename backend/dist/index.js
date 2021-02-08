"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.join(__dirname, "../.env") });
const server = http_1.createServer(app_1.default);
server.on("error", (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`Port ${process.env.PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`Port ${process.env.PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});
server.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on http://localhost:${process.env.PORT || 5000}`);
});
//# sourceMappingURL=index.js.map