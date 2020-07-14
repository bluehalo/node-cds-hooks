import express from 'express';
import { Application } from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Service from '../service';
import { Server } from 'http';

// Default discovery endpoint
const DISCOVERY_ENDPOINT = '/cds-services';

/**
 * Interface for the config object used when constructing a CDSServer
 *
 * @interface CDSServerConfig
 */
interface CDSServerConfig {
  morgan?: any;
}

/**
 * Main class for making CDS Hooks applications
 *
 * @export
 * @class CDSServer
 */
export default class CDSServer {
  public services: Array<Service>;
  public app: Application;

  /**
   * Creates an instance of CDSServer.
   * @param {CDSServerConfig} [cdsServerConfig]
   * @memberof CDSServer
   */
  constructor(private cdsServerConfig?: CDSServerConfig) {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(
      this.cdsServerConfig && this.cdsServerConfig.morgan
        ? this.cdsServerConfig.morgan
        : morgan('dev')
    );

    this.services = [];
  }

  /**
   * Register a Service
   *
   * @param {Service} service
   * @param {*} [discoveryEndpoint=DISCOVERY_ENDPOINT]
   * @returns {CDSServer}
   * @memberof CDSServer
   */
  registerService(service: Service, discoveryEndpoint = DISCOVERY_ENDPOINT): CDSServer {
    // Add the service to our registy
    this.services.push(service);

    // Add the services handler to
    this.app.post(`${discoveryEndpoint}/${service.id}`, service.handler);

    return this;
  }

  /**
   * Start the application by listening on a port.
   *
   * @param {{ port: number; discoveryEndpoint?: string }} {
   *       port = 3000,
   *       discoveryEndpoint = DISCOVERY_ENDPOINT
   *     }
   * @param {(args: any) => void} [callback]
   * @returns {Server}
   * @memberof CDSServer
   */
  listen(
    {
      port = 3000,
      discoveryEndpoint = DISCOVERY_ENDPOINT
    }: { port: number; discoveryEndpoint?: string },
    callback?: (args: any) => void
  ): Server {
    this.app.get(discoveryEndpoint, (_, res) =>
      res.json({ services: this.services.map((service) => service.toDefinition()) })
    );
    return this.app.listen(port, callback);
  }
}
