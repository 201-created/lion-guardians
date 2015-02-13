import Ember from 'ember';

export default Ember.Object.extend({
  component: null,
  // these have to be called lat and lng to match
  // expectations of google-map component
  lat: Ember.computed.alias('component.selectedLatitude'),
  lng: Ember.computed.alias('component.selectedLongitude'),
  isDraggable: Ember.computed.alias('component.isEditing'),
  hasInfoWindow: false
});
