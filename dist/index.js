"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.CDSServer = void 0;
const server_1 = __importDefault(require("./server"));
exports.CDSServer = server_1.default;
const service_1 = __importDefault(require("./service"));
exports.Service = service_1.default;
exports.default = server_1.default;
//# sourceMappingURL=index.js.map