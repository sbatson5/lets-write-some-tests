import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | books/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:books/index');
    assert.ok(route);
  });
});
