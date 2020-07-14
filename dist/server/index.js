"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const DISCOVERY_ENDPOINT = '/cds-services';
class CDSServer {
    constructor(cdsServerConfig) {
        this.cdsServerConfig = cdsServerConfig;
        this.app = express_1.default();
        this.app.use(body_parser_1.default.json());
        this.app.use(cors_1.default());
        this.app.use(this.cdsServerConfig && this.cdsServerConfig.morgan
            ? this.cdsServerConfig.morgan
            : morgan_1.default('dev'));
        this.services = [];
    }
    registerService(service, discoveryEndpoint = DISCOVERY_ENDPOINT) {
        this.services.push(service);
        this.app.post(`${discoveryEndpoint}/${service.id}`, service.handler);
        return this;
    }
    listen({ port = 3000, discoveryEndpoint = DISCOVERY_ENDPOINT }, callback) {
        this.app.get(discoveryEndpoint, (_, res) => res.json({ services: this.services.map((service) => service.toDefinition()) }));
        return this.app.listen(port, callback);
    }
}
exports.default = CDSServer;
//# sourceMappingURL=index.js.map