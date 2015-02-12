import Ember from 'ember';

export default Ember.Object.extend({
  imageSet: null,
  // these have to be called lat and lng to match
  // expectations of google-map component
  lat: Ember.computed.alias('imageSet.latitude'),
  lng: Ember.computed.alias('imageSet.longitude'),
  isDraggable: true,
  hasInfoWindow: false
});
