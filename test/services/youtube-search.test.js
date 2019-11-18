const assert = require('assert');
const app = require('../../src/app');

describe('\'youtubeSearch\' service', () => {
  it('registered the service', () => {
    const service = app.service('search');

    assert.ok(service, 'Registered the service');
  });
});
