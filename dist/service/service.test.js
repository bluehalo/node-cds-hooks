"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const _1 = __importDefault(require("."));
const mockServiceDefinition = {
    hook: 'patient-view',
    name: 'CDS Service Starter Patient View',
    description: 'An example of a CDS Service that displays "Hello World!"',
    id: 'cds-service-starter-patient-view',
    prefetch: {
        patient: 'Patient/{{context.patientId}}'
    }
};
const mockhandler = () => {
    return [];
};
describe('Service tests', () => {
    it('should be instantiated correctly', () => {
        const myService = new _1.default(mockServiceDefinition, mockhandler);
        expect(myService).toBeInstanceOf(_1.default);
    });
    it('toDefiniton should produce a proper Service definition', () => {
        const myService = new _1.default(mockServiceDefinition, mockhandler);
        const definition = myService.toDefinition();
        expect(definition).toEqual({
            hook: 'patient-view',
            name: 'CDS Service Starter Patient View',
            description: 'An example of a CDS Service that displays "Hello World!"',
            id: 'cds-service-starter-patient-view',
            prefetch: {
                patient: 'Patient/{{context.patientId}}'
            }
        });
    });
    it('registerServer should allow for a user to register a service', () => {
        const cdsServer = new server_1.default();
        const myService = new _1.default(mockServiceDefinition, mockhandler);
        myService.registerServer(cdsServer);
        expect(cdsServer.services).toHaveLength(1);
        expect(cdsServer.services[0].id).toEqual('cds-service-starter-patient-view');
    });
});
//# sourceMappingURL=service.test.js.map