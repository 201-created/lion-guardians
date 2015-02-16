import Ember from 'ember';

export default Ember.Component.extend({
  imageSet: null,
  activeLion: null,
  activeImageSet: null,
  lionName: null,
  showLionNameField: false,

  showAssociateButton: function(){
    // Show button if imageSet is not already
    // associated with a lion and there is an
    // activeLion available.
    var activeLion = this.get('activeLion'),
        lion = this.get('imageSet.lion');

    return activeLion && !lion;
  }.property('activeLion', 'imageSet.lion'),

  actions: {
    toggleShowLionName: function() {
      this.toggleProperty('showLionNameField');
    },

    associate: function(imageSet, activeLion) {
      this.sendAction('associate', imageSet, activeLion);
    },

    createLion: function(imageSet, lionName) {
      this.sendAction('createLion', imageSet, lionName);
    }
  }
});
