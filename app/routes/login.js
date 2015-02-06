import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    if (this.get('toriiSession.isAuthenticated')) {
      return this.transitionTo('dashboard');
    }
  },

  actions: {
    login: function() {
      var route = this;
      var controller = this.controller;
      var email = controller.get('email'),
          password = controller.get('password');
      var credentials = {email: email, password: password};

      this.get('toriiSession').open('lion-guardians', credentials).then(function(){
        route.transitionTo('dashboard');
      }).catch(function(e){
        controller.set('error', e.message || 'Unknown error');
      });
    }
  }
});
