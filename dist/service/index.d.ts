/// <reference types="express-serve-static-core" />
import CDSServer from '../server';
interface ServiceDefinition {
    hook: string;
    name: string;
    description: string;
    id: string;
    prefetch: any;
}
export default class Service {
    hook: string;
    name: string;
    description: string;
    id: string;
    prefetch: any;
    handler: (req: Express.Request) => Array<any>;
    constructor(definition: ServiceDefinition, handler: (req: Express.Request) => Array<any>);
    registerServer(cdsserver: CDSServer): CDSServer;
    toDefinition(): ServiceDefinition;
}
export {};
