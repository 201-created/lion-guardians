import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';
import OrganizationRouteMixin from 'lion-guardians/mixins/organization-route';
import RequireUserMixin from 'lion-guardians/mixins/require-user';

export default Ember.Route.extend( OrganizationRouteMixin, RequireUserMixin, {
  beforeModel: function() {
    var route = this;
    return this._super().then(function() {
      if (config.showMaps) {
        return route.loadGoogleMap();
      }
    });
  },

  model: function(params) {
    return this.store.find('imageSet', params.image_set_id);
  },

  actions: {
    associate: function(imageSet, lion) {
      var route = this,
          previousIsVerified = imageSet.get('isVerified');

      imageSet.setProperties({
        lion: lion,
        isVerified: false
      });

      imageSet.save().then(function() {
        route.transitionTo('lion', lion);
      }, function(error){
        imageSet.setProperties({
          lion: null,
          isVerified: previousIsVerified
        });

        if (!(error instanceof DS.InvalidError)) {
          alert("There was an error saving");
        }
      });
    },

    createLion: function(imageSet, lionName){
      var route = this;

      var lion = this.store.createRecord('lion', {
        primaryImageSet: imageSet,
        name: lionName
      });

      // Bind lion to controller so that we can show errors
      var controller = this.get('controller');
      controller.set('newLion', lion);

      lion.save().then(function(lion){
        route.transitionTo('lion', lion);
      }, function(error){
        if (!(error instanceof DS.InvalidError)) {
          alert("There was an error saving");
        }
      });
    }
  }
});
