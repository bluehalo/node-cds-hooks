/// <reference types="node" />
import { Application } from 'express';
import Service from '../service';
import { Server } from 'http';
interface CDSServerConfig {
    morgan?: any;
}
export default class CDSServer {
    private cdsServerConfig?;
    services: Array<Service>;
    app: Application;
    constructor(cdsServerConfig?: CDSServerConfig | undefined);
    registerService(service: Service, discoveryEndpoint?: string): CDSServer;
    listen({ port, discoveryEndpoint }: {
        port: number;
        discoveryEndpoint?: string;
    }, callback?: (args: any) => void): Server;
}
export {};
