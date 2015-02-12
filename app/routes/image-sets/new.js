import ImageSetRoute from '../image-set';

export default ImageSetRoute.extend({
  controllerName: 'image-set',

  model: function() {
    var currentUser = this.get('toriiSession.currentUser');
    return this.store.createRecord('image-set', {
      user: currentUser
    });
  },

  renderTemplate: function() {
    this.render('image-set');
    this.render('image-set/index', {into: 'image-set'});
  }

});
