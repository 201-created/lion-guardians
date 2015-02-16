import Ember from 'ember';

export default Ember.Controller.extend({
  imageSet: null,
  activeCvResult: null,

  activeImageSet: Ember.computed.alias('activeCvResult.imageSet'),
  activeLion: Ember.computed.alias('activeCvResult.lion'),

  actions: {
    setActiveCvResult: function(cvResult) {
      this.set('activeCvResult', cvResult);
    }
  }
});
