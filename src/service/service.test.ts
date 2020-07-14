import CDSServer from '../server';

import Service from '.';

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
    const myService = new Service(mockServiceDefinition, mockhandler);
    expect(myService).toBeInstanceOf(Service);
  });

  it('toDefiniton should produce a proper Service definition', () => {
    const myService = new Service(mockServiceDefinition, mockhandler);
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
    const cdsServer = new CDSServer();
    const myService = new Service(mockServiceDefinition, mockhandler);
    myService.registerServer(cdsServer);
    expect(cdsServer.services).toHaveLength(1);
    expect(cdsServer.services[0].id).toEqual('cds-service-starter-patient-view');
  });
});
