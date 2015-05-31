import ImageSetRoute from '../image-set';
import DS from 'ember-data';

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
  },

  actions: {
    createLion: function(imageSet, lionName){
      var lion = this.store.createRecord('lion', {
        primaryImageSet: imageSet,
        name: lionName
      });

      // Bind lion to controller so that we can show errors
      var controller = this.get('controller');
      controller.set('newLion', lion);

      lion.save().then(function(){
        return;
      }, function(error){
        if (!(error instanceof DS.InvalidError)) {
          alert("There was an error saving");
        }
      });
    }
  }

});
