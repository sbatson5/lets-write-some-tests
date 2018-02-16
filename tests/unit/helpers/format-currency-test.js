import { formatCurrency } from 'lets-write-some-tests/helpers/format-currency';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | format-currency', function(hooks) {
  setupTest(hooks);

  test('it formats 2 digits', function(assert) {
    let result = formatCurrency([42]);
    assert.equal(result, '$42.00', 'it formats value properly');
  });

  test('it formats many digits', function(assert) {
    let result = formatCurrency([12321312212312.42]);
    assert.equal(result, '$12,321,312,212,312.42', 'it formats value properly');
  });
});
