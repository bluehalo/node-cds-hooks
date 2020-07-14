import CDSServer from '../server';

/**
 * ServiceDefinition interface
 *
 * @interface ServiceDefinition
 */
interface ServiceDefinition {
  hook: string;
  name: string;
  description: string;
  id: string;
  prefetch: any;
}

/**
 * Main Service class. Use this in conjunction with a CDSServer.
 *
 * @export
 * @class Service
 */
export default class Service {
  public hook: string;
  public name: string;
  public description: string;
  public id: string;
  public prefetch: any;

  public handler: (req: Express.Request) => Array<any>;

  /**
   * Creates an instance of Service.
   * @param {ServiceDefinition} definition
   * @param {(req: Express.Request) => Array<any>} handler
   * @memberof Service
   */
  constructor(definition: ServiceDefinition, handler: (req: Express.Request) => Array<any>) {
    this.hook = definition.hook;
    this.name = definition.name;
    this.description = definition.description;
    this.id = definition.id;
    this.prefetch = definition.prefetch;
    this.handler = handler;
  }

  /**
   * Register this service with a CDSServer
   *
   * @param {CDSServer} cdsserver
   * @returns {CDSServer}
   * @memberof Service
   */
  registerServer(cdsserver: CDSServer): CDSServer {
    return cdsserver.registerService(this);
  }

  /**
   * Returns the service definition
   *
   * @returns {ServiceDefinition}
   * @memberof Service
   */
  toDefinition(): ServiceDefinition {
    return {
      hook: this.hook,
      name: this.name,
      description: this.description,
      id: this.id,
      prefetch: this.prefetch
    };
  }
}
