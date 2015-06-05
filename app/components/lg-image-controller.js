import Ember from 'ember';

const { reads, gt, or, not, and } = Ember.computed;

export default Ember.Component.extend({
  tagName: 'span',
  image: null,
  imageSet: null,
  editingEnabled: null,
  imageTypes: [],

  // properties from `image`
  isPublic: reads('image.isPublic'),
  isMainImage: reads('image.isMainImage'),

  // properties from `imageSet`
  imageSetHasImages: gt('imageSet.images.length', 1),

  // UI-related computed properties
  isDeleteButtonDisabled: or('cannotDelete', 'imageSet.isSaving'),
  isPublicCheckboxDisabled: or('image.isMainImage', 'imageSet.isSaving'),
  isImageTypeSelectDisabled: reads('imageSet.isSaving'),
  isMainButtonDisabled: or('cannotMakeMain', 'imageSet.isSaving'),

  canMakeMain: and('isPublic', 'isNotMainImage'),
  canDelete: and('imageSetHasImages', 'isNotMainImage'),

  // negations of CPs (used for UI CPs above)
  cannotMakeMain: not('canMakeMain'),
  cannotDelete: not('canDelete'),
  isNotMainImage: not('isMainImage'),

  // when changing an image's isPublic or imageType value,
  // save the image set
  updateImageSet: function() {
    if (this.get('image.isDirty')) {
      this.sendAction('saveImageSet');
    }
  }.observes('image.isPublic', 'image.imageType'),

  actions: {
    makeMainImage: function() {
      const image = this.get('image');
      this.sendAction('makeMainImage', image);
    },

    deleteImage: function() {
      const image = this.get('image');
      this.sendAction('deleteImage', image);
    }
  }
});
