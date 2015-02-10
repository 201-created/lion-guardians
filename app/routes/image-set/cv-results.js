import Ember from 'ember';

export default Ember.Route.extend({
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
