import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // we display lion organization names on this page, and
    // ember will complain if we attempt to do so without having
    // all the organizations in the store
    return this.store.find('organization');
  },

  model: function() {
    var imageSet = this.modelFor('imageSet');
    return this.store.find('cvResult', {image_set_id: imageSet.get('id')});
  },

  setupController: function(controller, model) {
    var imageSet = this.modelFor('imageSet');
    controller.setProperties({
      model: model,
      imageSet: imageSet
    });
  },

  resetController: function(controller) {
    controller.setProperties({
      model: null,
      activeCvResult: null
    });
  }
});
