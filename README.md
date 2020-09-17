# Node CDS Hooks

![Build Status](https://travis-ci.org/Asymmetrik/node-cds-hooks.svg?branch=master)

A framework for making CDS Hooks applications -- APIs that serve Cards to providers within EHRs.

## Getting started

Install node-cds-hooks as an npm module and save it to your package.json as a dependency

```sh
npm i @asymmetrik/node-cds-hooks
```

## Example Usage

```js
const { CDSServer, Service } = require('@asymmetrik/node-cds-hooks');

const definition = {
  hook: 'patient-view',
  name: 'CDS Service Starter Patient View',
  description: 'An example of a CDS Service that displays "Hello World!"',
  id: 'cds-service-starter-patient-view',
  prefetch: {
    patient: 'Patient/{{context.patientId}}',
  }
}

const handler = (req) => {
    return {
      cards: [
        {
          summary: 'My summary',
          detail: 'My details',
          source: {
            label: 'Node CDS Hooks',
            url: 'https://example.com',
          },
          indicator: 'info',
        }
      ]
    }
  }

};

// Create the server
const app = new CDSServer();

// Create the service
const service = new Service(definition,  handler);

// Register the service
app.registerService(service);

// Start the application
const port = 9000
app.listen({ port }, () => {
  logger.info('Application listening on port: ' + port);
}
```

After your app is running, query your discovery endpoint.

```sh
curl http://localhost:9000/cds-services
{"services":[{"hook":"patient-view","name":"CDS Service Starter Patient View","description":"An example of a CDS Service that displays \"Hello World!\"","id":"cds-service-starter-patient-view","prefetch":{"patient":"Patient/{{context.patientId}}"}}]}
```

You're up and running!
