import Ember from 'ember';

export default Ember.Controller.extend({
  organizations: null,
  activeLion: null,
  model: [],
  currentUser: Ember.computed.alias('toriiSession.currentUser'),

  canDeleteLion: function() {
    var user = this.get('currentUser'),
        lion = this.get('activeLion');

    return user && lion &&
      (user.get('organization.name') === lion.get('organization.name'));
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
      var activeLion = this.get('activeLion'),
          canDeleteLion = this.get('canDeleteLion');

      if (activeLion && canDeleteLion) {
        if (confirm("Are you sure you want to delete lion " + activeLion.get('name') + "? This cannot be undone.")) {
          this.set('activeLion', null);
          this.get('model').removeObject(activeLion);
          activeLion.destroyRecord();
        }
      }
    },

    viewLion: function(lion) {
      if (lion) {
        this.transitionToRoute('lion', lion);
      }
    }
  }
});
