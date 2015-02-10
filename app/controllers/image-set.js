import Ember from 'ember';
import {imageTypes} from 'lion-guardians/utils/units';

export default Ember.Controller.extend({
  imageTypes: imageTypes,
  uploadImageType: imageTypes[0],
  uploadIsPublic: false,
  organizations: null,

  actions: {
    addImage: function(upload){
      var url = upload.get('url'),
          isPublic = this.get('uploadIsPublic'),
          imageType = this.get('uploadImageType'),
          model = this.get('model');

      model.addImage(url, isPublic, imageType);

      // delete upload so it disappears from upload window
      upload.deleteRecord();
    },

    saveImageSet: function() {
      var imageSet = this.get('model'),
          controller = this;
      imageSet.save().then(function(imageSet) {
        // Remove original images that don't have IDs.
        // The server will come back with new objects
        var images = imageSet.get('images');
        var nullImages = images.rejectBy('id');
        images.removeObjects(nullImages);

        controller.transitionToRoute('image-set', imageSet);
      });
    },

    deleteImageSet: function() {
      var imageSet = this.get('model'),
          controller = this;
      imageSet.destroyRecord().then(function() {
        controller.transitionToRoute('image-sets');
      });
    },

    requestCv: function() {
      var imageSet = this.get('model'),
          currentUser = this.get('toriiSession.currentUser');

      var cvRequest = this.store.createRecord('cvRequest', {
        imageSet: imageSet,
        uploadingOrganization: currentUser.get('organization')
      });

      cvRequest.save();
    }
  }
});
