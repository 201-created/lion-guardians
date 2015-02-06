import Ember from 'ember';
import {imageTypes} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  imageTypes: imageTypes,
  editingEnabled: false,
  imageSet: null,

  isVisible: Ember.computed.gt('imageSet.images.length', 0),

  actions: {
    makeMainImage: function(image) {
      this.set('imageSet.mainImage', image);
    },

    deleteImage: function(image) {
      var imageSet = this.get('imageSet');
      imageSet.get('images').removeObject(image);
      if (imageSet.get('mainImage') === image) {
        imageSet.set('mainImage', null);
      }
      image.destroy();
    }
  }
});
