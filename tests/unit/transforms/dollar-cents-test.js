import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:dollar-cents', 'Unit | Transform | dollar cents', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:dollar-cents');
    assert.ok(transform);
  });
});
