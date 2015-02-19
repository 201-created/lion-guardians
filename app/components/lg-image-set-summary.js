import Ember from 'ember';

export default Ember.Component.extend({
  imageSet: null,
  classNames: ['lg-image-set-summary'],
  selectedImage: Ember.computed.reads('imageSet.mainImage'),

  status: function() {
    return this.get('imageSet.isVerified') ? 'Verified' : 'Unverified';
  }.property('imageSet.isVerified'),

  actions: {
    setSelectedImage: function(image) {
      this.set('selectedImage', image);
    }
  }
});
