import Ember from 'ember';

export default Ember.Route.extend({
  organizations: null,

  beforeModel: function() {
    var router = this;
    return this.store.find('organization').then(function(organizations) {
      router.set('organizations', organizations);
    });
  },

  model: function() {
    var currentOrganization = this.get('toriiSession.currentUser.organization');
    return this.store.find('imageSet', {
      organization_id: currentOrganization.get('id')
    });
  },

  setupController: function(controller, model) {
    var currentUser = this.get('toriiSession.currentUser'),
        organizations = this.get('organizations');
    controller.setProperties({
      currentUser: currentUser,
      model: model,
      organizations: organizations
    });
  }
});
