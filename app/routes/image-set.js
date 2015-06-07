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

    requestCv: function(imageSet) {
      var cvRequest = this.store.createRecord('cvRequest', {
        imageSet: imageSet
      });

      this.set('controller.newCvRequest', cvRequest);

      cvRequest.save().then(function(){
      }, function(error){
        if (!(error instanceof DS.InvalidError)) {
          alert("There was an error saving");
        }
      });
    }
  }
});
