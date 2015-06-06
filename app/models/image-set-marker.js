import Ember from 'ember';
const computed = Ember.computed;

export default Ember.Object.extend({
  // lat/lng props have to be called lat and lng to match
  // expectations of google-map component

  lat: computed(function(key, value) {
    if (arguments.length > 1) { // setter
      // ignore invalid int values
      if (!isNaN(parseInt(value, 10))) {
        this._lat = value;
      }
    }

    return this._lat;
  }),

  lng: computed(function(key, value) {
    if (arguments.length > 1) { // setter
      // ignore invalid int values
      if (!isNaN(parseInt(value, 10))) {
        this._lng = value;
      }
    }

    return this._lng;
  }),

  isDraggable: false,
  hasInfoWindow: false
});
