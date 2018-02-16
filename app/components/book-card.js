import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  bookNumber: computed('index', function() {
    return parseInt(get(this, 'index')) + 1;
  })
});
