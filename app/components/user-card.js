import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['md-list-item-text'],
  cardSelector: service('card-selector'),

  showInformation: computed('cardSelector.currentSelection', 'user.id', function() {
    let currentSelection = get(this, 'cardSelector').getCurrentSelection();
    let userId = get(this, 'user.id');
    return currentSelection === `user-${userId}`;
  }),

  saveDisabled: computed('user.hasDirtyAttributes', function() {
    return !get(this, 'user.hasDirtyAttributes');
  }),

  userNumber: computed('index', function() {
    return parseInt(get(this, 'index')) + 1;
  }),

  _saveUser() {
    let user = get(this, 'user');
    get(this, 'saveUser')(user);
    get(this, 'cardSelector').clearSelection();
  },

  actions: {
    toggleInformation() {
      let cardSelector = get(this, 'cardSelector');
      if (get(this, 'showInformation')) {
        cardSelector.clearSelection();
      } else {
        let userId = get(this, 'user.id');
        get(this, 'cardSelector').setCurrentSelection('user', userId);
      }
    },
    saveRecord() {
      this._saveUser();
    },
    checkForEnter({ keyCode }) {
      if (keyCode == 13) {
        this._saveUser();
      }
    }
  }
});
