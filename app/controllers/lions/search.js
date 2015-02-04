import Ember from 'ember';

export default Ember.Controller.extend({
  organizations: null,

  actions: {
    search: function(params) {
      var controller = this;
      this.store.find('lion', params).then(function(lions){
        controller.set('model', lions);
      });
    }
  }
});
