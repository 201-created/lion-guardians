import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var currentOrganization = this.get('toriiSession.currentUser.organization');
    return this.store.find('imageSet', {
      organization_id: currentOrganization.get('id')
    });
  },

  setupController: function(controller, model) {
    var currentUser = this.get('toriiSession.currentUser');
    controller.setProperties({
      currentUser: currentUser,
      model: model
    });
  }
});
