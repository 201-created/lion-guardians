import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'image-set',

  setupController: function(controller, model) {
    this._super(controller, model);

    var currentUser = this.get('toriiSession.currentUser');
    controller.set('currentUser', currentUser);
  }
});
