import Ember from 'ember';

export default Ember.Controller.extend({
  imageSet: null,
  activeCvResult: null,

  activeImageSet: Ember.computed.alias('activeCvResult.imageSet'),
  activeLion: Ember.computed.alias('activeCvResult.lion'),

  showAssociateButton: function() {
    // Show button if imageSet is not already
    // associated with a lion and there is an
    // activeLion available.
    var activeLion = this.get('activeLion'),
        lion = this.get('imageSet.lion');

    return activeLion && !lion;
  }.property('activeLion', 'imageSet.lion'),

  actions: {
    setActiveCvResult: function(cvResult) {
      this.set('activeCvResult', cvResult);
    }
  }
});
