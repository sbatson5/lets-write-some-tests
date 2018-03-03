import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:dollar-cents', 'Unit | Transform | dollar cents', function(hooks) {
  setupTest(hooks);

  test('it deserializes correctly', function(assert) {
    let transform = this.owner.lookup('transform:dollar-cents');
    let value = transform.deserialize(1000);
    assert.equal(value, 10);
  });

  test('it serializes correctly', function(assert) {
    let transform = this.owner.lookup('transform:dollar-cents');
    let value = transform.serialize(10.25);
    assert.equal(value, 1025);
  });
});
