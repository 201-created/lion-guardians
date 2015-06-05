import Ember from 'ember';
import {imageTypes} from 'lion-guardians/utils/units';

function removeUnsavedImages(imageSet) {
  const unsavedImages = imageSet.get('images').filter((img) => !img.get('id'));
  imageSet.get('images').removeObjects(unsavedImages);
}

export default Ember.Component.extend({
  imageTypes: imageTypes,
  editingEnabled: false,
  imageSet: null,

  isVisible: Ember.computed.gt('imageSet.images.length', 0),

  actions: {
    saveImageSet: function() {
      var imageSet = this.get('imageSet');
      if (imageSet.get('id')) {
        imageSet.save().then((imageSet) => {
          removeUnsavedImages(imageSet);
        });
      }
    },

    makeMainImage: function(image) {
      var imageSet = this.get('imageSet');
      imageSet.set('mainImage', image);
      if (imageSet.get('id')) {
        imageSet.save();
      }
    },

    deleteImage: function(image) {
      if (confirm('Are you sure you want to delete this image? This cannot be undone.')) {
        var imageSet = this.get('imageSet');
        imageSet.get('images').removeObject(image);

        if (imageSet.get('mainImage') === image) {
          imageSet.set('mainImage', null);
        }
        image.destroyRecord();
      }
    }
  }
});
