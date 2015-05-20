import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';
import RequireUserMixin from 'lion-guardians/mixins/require-user';

export default Ember.Route.extend(RequireUserMixin, {
  beforeModel: function() {
    var route = this;
    return this._super().then(function() {
      return route.store.find('organization');
    }).then(function(organizations){
      route.set('organizations', organizations);
    }).then(function() {
      if (config.showMaps) {
        return route.loadGoogleMap();
      }
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    var currentUser = this.get('toriiSession.currentUser'),
        organizations = this.get('organizations');

    controller.setProperties({
      organizations: organizations,
      model: model,
      currentUser: currentUser
    });
  },

  actions: {
    selectImageSet: function(imageSet) {
      this.set('controller.activeImageSet', imageSet);
    },

    makePrimaryImageSet: function(imageSet) {
      var lion = imageSet.get('lion'),
          oldPrimary = lion.get('primaryImageSet');

      lion.set('primaryImageSet', imageSet);

      lion.save().then(function() {
      }, function(error) {
        lion.set('primaryImageSet', oldPrimary);

        if (!(error instanceof DS.InvalidError)) {
          alert("There was an error saving");
        }
      });
    },

    removeImageSet: function(imageSet) {

      if(confirm("Are you sure you want to remove this Image Set? It will still show up in your organization's list if image sets, but it will not belong to this lion.")) {
        var lion = imageSet.get('lion');
        var isPrimary = imageSet === lion.get('primaryImageSet');

        imageSet.set('lion', null);
        lion.get('imageSets').removeObject(imageSet);
        if (isPrimary) {
          lion.set('primaryImageSet', null);
        }

        imageSet.save().then(function() {
        }, function(error) {
          imageSet.set('lion', lion);

          lion.get('imageSets').pushObject(imageSet);
          if (isPrimary) {
            lion.set('primaryImageSet', imageSet);
          }

          if (!(error instanceof DS.InvalidError)) {
            alert("There was an error saving");
          }
        });
      }
    }
  }
});
