import Service from '@ember/service';
import { get, set } from '@ember/object';

export default Service.extend({
  currentSelection: null,

  setCurrentSelection(type, id) {
    set(this, 'currentSelection', `${type}-${id}`);
  },

  clearSelection() {
    set(this, 'currentSelection', null);
  },

  getCurrentSelection() {
    return get(this, 'currentSelection');
  }
});
