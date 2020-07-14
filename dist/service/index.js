"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(definition, handler) {
        this.hook = definition.hook;
        this.name = definition.name;
        this.description = definition.description;
        this.id = definition.id;
        this.prefetch = definition.prefetch;
        this.handler = handler;
    }
    registerServer(cdsserver) {
        return cdsserver.registerService(this);
    }
    toDefinition() {
        return {
            hook: this.hook,
            name: this.name,
            description: this.description,
            id: this.id,
            prefetch: this.prefetch
        };
    }
}
exports.default = Service;
//# sourceMappingURL=index.js.map