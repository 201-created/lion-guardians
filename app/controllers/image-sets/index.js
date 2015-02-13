import Ember from 'ember';

export default Ember.Controller.extend({
  organizations: null,
  currentUser: null,
  currentOrganization: Ember.computed.alias('currentUser.organization'),
  activeImageSet: null,
  selectedOrganization: Ember.computed.reads('currentOrganization'),

  canView: Ember.computed.alias('activeImageSet'),
  canRequestCv: Ember.computed.alias('activeImageSet'),
  canViewCv: Ember.computed.alias('activeImageSet.hasCvResults'),
  canDelete: function() {
    return this.get('activeImageSet.uploadingOrganization') === this.get('currentOrganization');
  }.property('activeImageSet.uploadingOrganization', 'currentOrganization'),

  actions: {
    displayResults: function(imageSets) {
      this.set('model', imageSets);
    },

    selectImageSet: function(imageSet) {
      this.set('activeImageSet', imageSet);
    },

    viewImageSet: function() {
      var activeImageSet = this.get('activeImageSet');
      if (activeImageSet) {
        this.transitionToRoute('image-set', activeImageSet);
      }
    },

    deleteImageSet: function() {
      var activeImageSet = this.get('activeImageSet'),
          canDelete = this.get('canDelete');

      if (activeImageSet && canDelete) {
        this.set('activeImageSet', null);
        activeImageSet.destroyRecord();
      }
    },

    viewCv: function() {
      var activeImageSet = this.get('activeImageSet');
      if (activeImageSet) {
        this.transitionToRoute('image-set.cv-results', activeImageSet);
      }
    },

    requestCv: function(activeImageSet) {
      if (activeImageSet) {
        // Bubble up to handler on application route
        return true;
      }
    }
  }
});
