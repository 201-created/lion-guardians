import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
  organizations: null,
  currentUser: null,
  currentOrganization: Ember.computed.alias('currentUser.organization'),
  activeImageSet: null,
  hasLion: Ember.computed.reads('activeImageSet.lion'),
  activeLionName: function() {
    return this.get('activeImageSet.lion.name') || 'Lion';
  }.property('activeImageSet', 'activeImageSet.lion.name'),
  selectedOrganization: Ember.computed.reads('currentOrganization'),
  newCvRequest: null,
  model: [],
  numberOfSearchResults: Ember.computed.reads('model.length'),

  canView: Ember.computed.alias('activeImageSet'),
  canViewCv: Ember.computed.alias('activeImageSet.hasCvResults'),
  cvRequestPending: Ember.computed.alias('activeImageSet.cvRequestPending'),

  canRequestCv: function() {
    var activeImageSet = this.get('activeImageSet');

    return activeImageSet && !activeImageSet.get('hasCvRequest');
  }.property('activeImageSet', 'activeImageSet.hasCvRequest'),

  isOwner: function() {
    return this.get('activeImageSet.organization') === this.get('currentOrganization');
  }.property('activeImageSet.organization', 'currentOrganization'),

  canDelete: Ember.computed.alias('isOwner'),

  actions: {
    displayResults: function(imageSets) {
      this.set('activeImageSet', null);
      this.set('model', imageSets);
    },

    selectImageSet: function(imageSet) {
      this.set('activeImageSet', imageSet);
    },

    deleteImageSet: function() {
      var activeImageSet = this.get('activeImageSet'),
          canDelete = this.get('canDelete');

      if (activeImageSet && canDelete) {
        if (confirm("Are you sure you want to delete image set " + activeImageSet.get('id') + "? this cannot be undone.")) {
          this.set('activeImageSet', null);
          activeImageSet.destroyRecord();
        }
      }
    },

    disassociateLion: function() {
      var activeImageSet = this.get('activeImageSet');
      activeImageSet.setProperties({
        lion: null,
        isVerified: false
      });

      activeImageSet.save();
    },

    viewCv: function() {
      var activeImageSet = this.get('activeImageSet');
      if (activeImageSet) {
        this.transitionToRoute('image-set.cv-results', activeImageSet);
      }
    },

    requestCv: function(imageSet) {
      var cvRequest = this.store.createRecord('cvRequest', {
        imageSet: imageSet
      });

      this.controllerFor('image-set').set('newCvRequest', cvRequest);
      cvRequest.save().then(function(){
      }, function(error){
        if (!(error instanceof DS.InvalidError)) {
          alert("There was an error saving");
        }
      });
    }
  }
});
