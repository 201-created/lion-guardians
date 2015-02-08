import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    if (!this.get('toriiSession.isAuthenticated')) {
      return this.transitionTo('login');
    }
  }
});
