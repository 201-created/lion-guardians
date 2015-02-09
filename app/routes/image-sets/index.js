import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('imageSet');
  },

  setupController: function(controller, model) {
    var currentUser = this.get('toriiSession.currentUser');
    controller.setProperties({
      currentUser: currentUser,
      model: model
    });
  }
});
