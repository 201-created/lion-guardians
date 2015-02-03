import ImageSetRoute from '../image-set';

export default ImageSetRoute.extend({
  controllerName: 'image-set',

  model: function() {
    return this.store.createRecord('image-set', {
      userId: '1' // TODO Remove once we have user auth. requires a user on the backend
    });
  },

  renderTemplate: function() {
    this.render('image-set');
  }

});
