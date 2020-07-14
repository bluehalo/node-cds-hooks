"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const service_1 = __importDefault(require("../service"));
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
const mockHandler = () => {
    return [];
};
describe('CDSServer class', () => {
    beforeEach(() => {
        jest.mock('morgan', () => jest.fn());
        jest.mock('body-parser', () => ({
            urlencoded: jest.fn(),
            json: jest.fn()
        }));
        jest.mock('express', () => {
            const mock = jest.fn(() => ({
                use: jest.fn(),
                set: jest.fn(),
                get: jest.fn(),
                listen: jest.fn(),
                options: jest.fn(),
                post: jest.fn(),
                static: jest.fn()
            }));
            return mock;
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should be instantiated without being supplied a config', () => {
        const server = new _1.default();
        expect(server).toBeDefined();
        expect(server).toBeInstanceOf(_1.default);
    });
    it('should be instantlized when being supplied a config', () => {
        const mockLogger = jest.fn();
        const server = new _1.default({ morgan: () => mockLogger });
        expect(server).toBeDefined();
        expect(server).toBeInstanceOf(_1.default);
    });
    it('should register CDS Services', () => {
        const server = new _1.default();
        const myService = new service_1.default(mockServiceDefinition, mockHandler);
        server.registerService(myService);
        expect(server.services).toHaveLength(1);
    });
    it('should register CDS Services', () => {
        const server = new _1.default();
        const expressSpy = spyOn(server.app, 'post');
        const myService = new service_1.default(mockServiceDefinition, mockHandler);
        server.registerService(myService);
        expect(server.services).toHaveLength(1);
        expect(expressSpy).toHaveBeenCalledWith('/cds-services/cds-service-starter-patient-view', myService.handler);
    });
    it('should listen on a port', (done) => {
        const server = new _1.default();
        const http = server.listen({ port: 9999 }, () => {
            expect(true).toBeTruthy();
        });
        http.close(done);
    });
    it('should listen respond to discovery endpoint requests', (done) => {
        const server = new _1.default();
        const myService = new service_1.default(mockServiceDefinition, mockHandler);
        server.registerService(myService);
        const http = server.listen({ port: 9999, discoveryEndpoint: '/cds-services' });
        http.close(() => {
            supertest_1.default(server.app)
                .get('/cds-services')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                expect(res.body).toEqual({
                    services: [
                        {
                            hook: 'patient-view',
                            name: 'CDS Service Starter Patient View',
                            description: 'An example of a CDS Service that displays "Hello World!"',
                            id: 'cds-service-starter-patient-view',
                            prefetch: { patient: 'Patient/{{context.patientId}}' }
                        }
                    ]
                });
                done();
            });
        });
    });
});
//# sourceMappingURL=server.test.js.map