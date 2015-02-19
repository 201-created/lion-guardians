import Ember from 'ember';

export default Ember.Component.extend({
  imageSet: null,
  selectedImage: null,
  selectedImageType: null,

  filteredImageSet: function() {
    this.get('imageSet.images').filterBy('imageType', this.get('selectedImageType'));
  }.property('selectedImageType'),

  actions: {
    setSelectedImage: function(image) {
      this.set('selectedImage', image);
    }
  }
});
