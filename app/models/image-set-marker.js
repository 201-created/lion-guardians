import Ember from 'ember';
const { alias } = Ember.computed;

export default Ember.Object.extend({
  component: null,
  // these have to be called lat and lng to match
  // expectations of google-map component
  lat: alias('component.selectedLatitude'),
  lng: alias('component.selectedLongitude'),
  isDraggable: alias('component.isEditing'),
  hasInfoWindow: false
});
