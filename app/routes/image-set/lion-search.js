import Ember from 'ember';
import OrganizationRouteMixin from 'lion-guardians/mixins/organization-route';

export default Ember.Route.extend(OrganizationRouteMixin, {
  model: function() {
    // Model will be populated after searching,
    // in displayResults action on controller.
    return [];
  },

  setupController: function(controller) {
    var imageSet = this.modelFor('imageSet');
    controller.setProperties({
      imageSet: imageSet
    });
  },

  resetController: function(controller) {
    controller.setProperties({
      model: [],
      activeLion: null
    });
  }

});
