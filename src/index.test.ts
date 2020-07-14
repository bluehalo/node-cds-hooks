import { CDSServer, Service } from '.';

describe('index tests', () => {
  it('should export things propery', () => {
    expect(CDSServer).toBeDefined();
    expect(Service).toBeDefined();
  });
});
