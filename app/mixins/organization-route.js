import Ember from 'ember';

export default Ember.Mixin.create({
  setupController: function(controller, model) {
    this._super(controller, model);
    return this.store.find('organization').then(function(organizations){
      controller.set('organizations', organizations);
    });
  }
});
