import Ember from 'ember';

export default Ember.Controller.extend({
  organizations: null,
  activeLion: null,
  model: [],
  numberOfSearchResults: Ember.computed.reads('model.length'),
  currentUser: Ember.computed.alias('toriiSession.currentUser'),

  canDeleteLion: function() {
    var user = this.get('currentUser'),
        lion = this.get('activeLion');

    return user && lion &&
      (user.get('organization') === lion.get('organization'));
  }.property('user.organization', 'activeLion.organization'),

  actions: {
    displayResults: function(lions) {
      this.set('activeLion', null);
      this.set('model', lions);
    },

    selectLion: function(lion) {
      this.set('activeLion', lion);
    },

    deleteLion: function() {
      var activeLion = this.get('activeLion');
      this.set('activeLion', null);
      this.get('model').removeObject(activeLion);
      activeLion.destroyRecord();
    },

    viewLion: function(lion) {
      if (lion) {
        this.transitionToRoute('lion', lion);
      }
    }
  }
});
