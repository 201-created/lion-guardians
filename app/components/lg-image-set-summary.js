import Ember from 'ember';

export default Ember.Component.extend({
  imageSet: null,
  classNames: ['lg-image-set-summary'],
  selectedImage: function() {
    this.get('imageSet.mainImage');
  },

  selectedImageType: null,

  status: function() {
    return this.get('imageSet.isVerified') ? 'Verified' : 'Unverified';
  }.property('imageSet.isVerified')
});
