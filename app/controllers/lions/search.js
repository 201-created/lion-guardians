import Ember from 'ember';

export default Ember.Controller.extend({
  organizations: null,

  actions: {
    displayResults: function(lions) {
      this.set('model', lions);
    }
  }
});
