import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("image-sets", function() {
    this.route("new");
  }),

  this.resource("image-set", { path: '/image-set/:image_set_id' }, function() {});
});

export default Router;
