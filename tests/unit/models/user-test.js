import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

let originalDateNow;

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    originalDateNow = Object.getOwnPropertyDescriptor(Date, 'now');
    Object.defineProperty(Date, 'now', {
      value() {
        return new Date('1/1/2018');
      }
    });
  });

  hooks.afterEach(function() {
    Object.defineProperty(Date, 'now', originalDateNow);
  });

  test('it calculates user\'s personal information properly', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = run(() => store.createRecord('user', {
      firstName: 'Bob',
      lastName: 'Builder',
      dateOfBirth: '1/12/1975'
    }));

    assert.ok(model.get('isOverEighteen'), 'They are over 18');
    assert.equal(model.get('age'), 42, 'person is 42');
    assert.equal(model.get('fullName'), 'Bob Builder', 'proper name');
  });

  test('it calculates user financial information', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = run(() => store.createRecord('user', {
      currentSavingsAmount: 10000,
      currentCheckingAmount: 90000012
    }));

    assert.equal(model.get('currentSavingsInCents'), 100);
    assert.equal(model.get('currentCheckingInCents'), 900000.12);
    run(() => {
      model.set('currentSavingsInCents', 45323);
      model.set('currentCheckingInCents', 88);
    });
    assert.equal(model.get('currentSavingsAmount'), 4532300);
    assert.equal(model.get('currentCheckingAmount'), 8800);
  });
});
