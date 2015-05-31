import Ember from 'ember';

export default Ember.Component.extend({
  imageSet: null,
  classNames: ['lg-image-set-summary'],
  selectedImage: Ember.computed.reads('imageSet.mainImage'),
  heroImage: false,

  setName: function() {
    if (this.get('imageSet.isPrimary')) {
      return 'Primary Image Set for ' + this.get('imageSet.lion.name');
    } else {
      return 'Image Set ID ' + this.get('imageSet.id');
    }
  }.property('imageSet.isPrimary', 'imageSet.lion.name', 'imageSet.id'),

  verificationStatus: function() {
    return this.get('imageSet.isVerified') ? 'Verified' : 'Unverified';
  }.property('imageSet.isVerified'),

  actions: {
    setSelectedImage: function(image) {
      this.set('selectedImage', image);
    }
  }
});
