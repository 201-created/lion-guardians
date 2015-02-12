import Ember from 'ember';

export default Ember.Controller.extend({
  imageSet: null,
  activeCvResult: null,
  lionName: null,
  showLionNameField: false,

  showAssociateButton: function(){
    // Show button if there is an activeCvResult
    // and it has not yet been associated with a lion
    var activeCvResult = this.get('activeCvResult'),
        lion = this.get('imageSet.lion');

    return activeCvResult && !lion;
  }.property('activeCvResult', 'imageSet.lion'),

  actions: {
    setActiveCvResult: function(cvResult) {
      this.set('activeCvResult', cvResult);
    },

    associate: function(cvResult) {
      var lion = cvResult.get('lion'),
          imageSet = this.get('imageSet'),
          controller = this;

      imageSet.setProperties({
        lion: lion,
        isVerified: false
      });

      imageSet.save().then(function() {
        controller.transitionToRoute('lion', lion);
      });
    },

    toggleShowLionName: function() {
      this.toggleProperty('showLionNameField');
    },

    createLion: function(){
      var imageSet = this.get('imageSet'),
          lionName = this.get('lionName'),
          controller = this;

      var lion = this.store.createRecord('lion', {
        primaryImageSet: imageSet,
        name: lionName
      });

      lion.save().then(function(lion){
        controller.set('showLionNameField', false);
        controller.transitionToRoute('lion', lion);
      });
    }
  }
});
