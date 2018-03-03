import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, getContext, render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import stubbedService from 'lets-write-some-tests/tests/helpers/stub-service';

function query(selector) {
  return getContext().element.querySelector(selector);
}

function getTextFromElement(selector) {
  return query(selector).textContent.trim();
}

module('Integration | Component | user-card', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    let user = {
      id: 1,
      fullName: 'Billy Boy',
      email: '123@something.org',
      dateOfBirth: new Date('1/2/2001'),
      currentSavingsInCents: 1000,
      currentCheckingInCents: 1000
    };
    this.set('user', user);
  });

  test('it toggles user information', async function(assert) {
    await render(hbs`{{user-card user=user}}`);

    assert.equal(getTextFromElement('.md-subhead'), 'Name: Billy Boy', 'User name is shown');

    await click('.md-button');
    assert.ok(query('.user-content'), 'user information is shown after toggle');
    let userFields = this.element.querySelectorAll('h5');
    assert.equal(userFields[0].textContent.trim(), 'Email: 123@something.org');
    assert.equal(userFields[2].textContent.trim(), 'Savings: $1,000.00');

    await click('.md-button');
    assert.notOk(query('.user-content'), 'user information is hidden after toggle');
  });

  test('it shows correct user information initially', async function(assert) {
    stubbedService('card-selector', {
      setCurrentSelection() {
      },
      clearSelection() {
      },
      getCurrentSelection() {
        return 'user-1';
      }
    });

    await render(hbs`{{user-card user=user}}`);
    assert.ok(query('.user-content'), 'user information is shown');
  });

  test('it does not show correct user information initially', async function(assert) {
    stubbedService('card-selector', {
      setCurrentSelection() {
      },
      clearSelection() {
      },
      getCurrentSelection() {
        return 'user-2';
      }
    });

    await render(hbs`{{user-card user=user}}`);
    assert.notOk(query('.user-content'), 'user information is shown');
  });

  test('it saves on enter with user notes', async function(assert) {
    assert.expect(3);

    this.set('saveUser', function(user) {
      assert.deepEqual(user, this.get('user'), 'user is sent');
      assert.equal(user.notes, 'Here are some notes', 'notes sent');
    });

    stubbedService('card-selector', {
      setCurrentSelection() {
        assert.notOk(true, 'this should not be called');
      },
      clearSelection() {
        assert.ok(true, 'this method is called');
      },
      getCurrentSelection() {
        return 'user-1';
      }
    });

    await render(hbs`{{user-card user=user saveUser=(action saveUser)}}`);
    await fillIn('input[name="notes"]', 'Here are some notes');
    await triggerKeyEvent('input[name="notes"]', 'keydown', 13);
  });

  test('user number is shown if present', async function(assert) {
    this.set('index', 0);
    this.set('user.isOverEighteen', true);

    await render(hbs`{{user-card user=user index=index}}`);

    assert.ok(query('.md-headline'));
    assert.equal(getTextFromElement('.md-headline'), 'User number 1');

    await click('.md-button');

    assert.ok(query('.age-alert'));
  });
});
