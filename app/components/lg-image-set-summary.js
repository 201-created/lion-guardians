import Ember from 'ember';

export default Ember.Component.extend({
  imageSet: null,
  classNames: ['lg-image-set-summary'],

  status: function() {
    return this.get('imageSet.isVerified') ? 'Verified' : 'Unverified';
  }.property('imageSet.isVerified')
});
