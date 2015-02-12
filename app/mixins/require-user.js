import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function() {
    var currentUser = this.get('toriiSession.currentUser');
    if (!currentUser) {
      this.transitionTo('login');
    }

    return Ember.RSVP.resolve();
  }
});
