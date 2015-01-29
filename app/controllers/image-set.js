import Ember from 'ember';
import {imageTypes, genders} from 'lion-guardians/utils/units';

export default Ember.Controller.extend({
  imageTypes: imageTypes,
  genders: genders,
  uploadImageType: imageTypes[0],
  uploadIsPublic: false,
  isEditing: false,

  organizations: function() {
    return this.store.findAll('organization');
  }.property(),

  actions: {
    addImage: function(upload){
      var url = upload.get('url'),
          isPublic = this.get('uploadIsPublic'),
          imageType = this.get('uploadImageType'),
          model = this.get('model');

      model.addImage(url, isPublic, imageType);

      Ember.run.later(this, function(){
        // delete upload so it disappears from upload window
        upload.deleteRecord();
      }, 3000);
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

        // Can transition as soon as imageSet is saved and
        // save the rest of the images async.
        controller.transitionToRoute('image-set', imageSet);

        imageSet.get('mainImage').save().then(function(mainImage) {
          imageSet.save(); // save again with id for Main Image.

          // Save the rest of the images
          imageSet.get('images').forEach(function(image) {
            if (image !== mainImage && image.get('isDirty')) {
              image.save();
            }
          });
        });
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
