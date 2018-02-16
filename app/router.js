import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('books', function() {
    this.route('show', { path: '/:id' });
  });
  this.route('users', function() {
    this.route('show', { path: '/:id' });
  });
});

export default Router;
