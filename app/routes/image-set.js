import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('imageSet', params.image_set_id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    return this.store.find('organization').then(function(organizations){
      controller.set('organizations', organizations);
    });
  }
});
