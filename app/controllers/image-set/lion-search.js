import Ember from 'ember';

export default Ember.Controller.extend({
  imageSet: null,
  activeLion: null,

  actions: {
    displayResults: function(imageSets) {
      this.set('model', imageSets);
    },

    selectLion: function(lion) {
      this.set('activeLion', lion);
    }
  }
});
