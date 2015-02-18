import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
  currentUser: null,
  activeImageSet: null,

  isOwner: function() {
    return this.get('model.organization') === this.get('currentUser.organization');
  }.property('model.organization', 'currentUser.organization'),

  canMakePrimary: function() {
    return this.get('activeImageSet') && this.get('isOwner');
  }.property('activeImageSet', 'isOwner'),

  actions: {
    selectImageSet: function(imageSet) {
      this.set('activeImageSet', imageSet);
    },

    viewImageSet: function() {
      var imageSet = this.get('activeImageSet');
      if (imageSet) {
        this.transitionToRoute('image-set', imageSet);
      }
    },

    makePrimaryImageSet: function() {
      var imageSet = this.get('activeImageSet'),
          lion = this.get('model'),
          isOwner = this.get('isOwner'),
          oldPrimary = lion.get('primaryImageSet');

      if (isOwner && imageSet) {
        lion.set('primaryImageSet', imageSet);

        lion.save().then(function() {
        }, function(error) {
          lion.set('primaryImageSet', oldPrimary);

          if (!(error instanceof DS.InvalidError)) {
            alert("There was an error saving");
          }
        });
      }
    }
  }
});
