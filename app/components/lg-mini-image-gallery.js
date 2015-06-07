import Ember from 'ember';
import {imageTypesForFilter} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  imageSet: null,
  maxImageCount: 4,

  selectedImage: null,
  imageTypes: imageTypesForFilter,
  selectedImageType: imageTypesForFilter[0],
  hasFilteredImages: Ember.computed.gt('filteredImages.length', 0),

  filteredImages: function() {
    const selectedImageType = this.get('selectedImageType'),
          images = this.get('imageSet.images'),
          maxImageCount = this.get('maxImageCount');

    let filteredImages;

    if (selectedImageType === 'all') {
      filteredImages = images;
    } else {
      filteredImages = images.filterBy('imageType', selectedImageType);
    }

    return filteredImages.slice(0,maxImageCount);
  }.property('selectedImageType', 'imageSet.images.[]'),

  actions: {
    selectImage: function(image) {
      this.sendAction('setSelectedImage', image);
    }
  }
});
