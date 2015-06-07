import ImageSetRoute from '../image-set';

export default ImageSetRoute.extend({
  controllerName: 'image-set',

  model: function() {
    const user = this.get('toriiSession.currentUser');
    const organization = user.get('organization');

    return this.store.createRecord('image-set', {user, organization});
  },

  renderTemplate: function() {
    this.render('image-set');
    this.render('image-set/index', {into: 'image-set'});
  }
});
