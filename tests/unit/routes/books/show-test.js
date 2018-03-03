import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | books/show', function(hooks) {
  setupTest(hooks);

  test('it sets up the controller', function(assert) {
    let route = this.owner.lookup('route:books/show');
    let controller = {};
    let dummyModel = {
      name: 'foo',
      price: 100
    };
    route.setupController(controller, dummyModel);
    assert.deepEqual(controller.book, dummyModel, 'it setups book model');
  });
});
