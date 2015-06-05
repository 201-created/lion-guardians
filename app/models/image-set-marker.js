import Ember from 'ember';
const computed = Ember.computed;

export default Ember.Object.extend({
  // these have to be called lat and lng to match
  // expectations of google-map component
  lat: computed(function(key, value) {
    if (arguments.length > 1) { // setter
      if (!isNaN(parseInt(value, 10))) {
        this._lat = value;
        console.log('set lat:',value);
      } else {
        console.log('skipping NaN lat value:',value);
      }
    }

    return this._lat;
  }),

  lng: computed(function(key, value) {
    if (arguments.length > 1) { // setter
      this._lng = value;
      console.log('set lng', value);
    }

    return this._lng;
  }),

  isDraggable: false,
  hasInfoWindow: false
});
