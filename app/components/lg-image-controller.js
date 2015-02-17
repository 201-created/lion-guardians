import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  image: null,
  editingEnabled: null,
  imageTypes: [],

  selectedIsPublic: Ember.computed.reads('image.isPublic'),
  selectedImageType: Ember.computed.reads('image.imageType'),

  // Image set must have at least 1 image
  canDelete: Ember.computed.gt('image.imageSet.images.length', 1),

  canMakeMain: function() {
    var isMainImage = this.get('image.isMainImage'),
        isPublic = this.get('image.isPublic');

    return isPublic && !isMainImage;
  }.property('image.isMainImage', 'image.isPublic'),

  updateImageSet: function() {
    var selectedIsPublic = this.get('selectedIsPublic'),
        selectedImageType =this.get('selectedImageType'),
        isPublic = this.get('image.isPublic'),
        imageType = this.get('image.imageType');

    if (selectedIsPublic !== isPublic || selectedImageType !== imageType) {
      var image = this.get('image');
      image.setProperties({
        isPublic: selectedIsPublic,
        imageType: selectedImageType
      });

      this.sendAction('saveImageSet');
    }
  }.observes('selectedIsPublic', 'selectedImageType'),

  actions: {
    makeMainImage: function() {
      var image = this.get('image');
      this.sendAction('makeMainImage', image);
    },

    deleteImage: function() {
      var image = this.get('image');
      this.sendAction('deleteImage', image);
    }
  }
});
