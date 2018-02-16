import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  model(params) {
   return this.store.findRecord('book', params.id);
  },

  setupController(controller, model) {
   set(controller, 'book', model);
  }
});
