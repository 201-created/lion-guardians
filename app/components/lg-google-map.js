import Ember from 'ember';
import config from '../config/environment';
import {defaultLocation} from 'lion-guardians/utils/units';

const { alias, reads } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['lg-google-map'],
  defaultLocation: defaultLocation,
  marker: null,
  isVisible: alias('showMaps'),

  init: function(){
    this._super.apply(this, arguments);

    // set once -- we don't want a live binding to the lat/lng
    // because it makes it difficult to drag a marker around the map
    this._setLatLon();
  },

  showMaps: config.showMaps,

  zoom: reads('defaultLocation.zoom'),
  mapType: reads('defaultLocation.mapType'),

  markers: function() {
    var marker = this.get('marker');

    if (marker) {
      return [marker];
    } else {
      return [];
    }
  }.property('marker'),

  _setLatLon: function(){
    var lng = this.get('marker.lng') || defaultLocation.longitude;
    this.set('longitude', lng);

    var lat = this.get('marker.lat') || defaultLocation.latitude;
    this.set('latitude', lat);
  },

});
