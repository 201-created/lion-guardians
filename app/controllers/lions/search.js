import Ember from 'ember';

export default Ember.Controller.extend({
  organizations: null,
  activeLion: null,

  actions: {
    displayResults: function(lions) {
      this.set('model', lions);
    },

    selectLion: function(lion) {
      this.set('activeLion', lion);
    },

    viewLion: function(lion) {
      if (lion) {
        this.transitionToRoute('lion', lion);
      }
    }
  }
});
