import Ember from 'ember';
import {imageTypes, genders} from 'lion-guardians/utils/units';

export default Ember.Controller.extend({
  imageTypes: imageTypes,
  genders: genders,
  uploadImageType: imageTypes[0],
  uploadIsPublic: false,
  isEditing: false,
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

    makeMainImage: function(image) {
      this.set('model.mainImage', image);
    },

    deleteImage: function(image) {
      var imageSet = this.get('model');
      imageSet.get('images').removeObject(image);
      if (imageSet.get('mainImage') === image) {
        imageSet.set('mainImage', null);
      }
      image.destroy();
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

    startEditing: function() {
      this.set('isEditing', true);
    },

    finishEditing: function() {
      this.set('isEditing', false);
    }
  }
});
