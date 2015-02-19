import Ember from 'ember';
import {imageTypesForFilter} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  imageSet: null,
  selectedImage: null,
  imageTypes: imageTypesForFilter,
  selectedImageType: imageTypesForFilter[0],
  hasFilteredImages: Ember.computed.gt('filteredImages.length', 0),

  filteredImages: function() {
    var selectedImageType = this.get('selectedImageType'),
        images = this.get('imageSet.images');

    if (selectedImageType === 'all') {
      return images;
    } else {
      return images.filterBy('imageType', selectedImageType);
    }
  }.property('selectedImageType', 'imageSet.images.[]'),

  actions: {
    selectImage: function(image) {
      this.sendAction('setSelectedImage', image);
    }
  }
});
