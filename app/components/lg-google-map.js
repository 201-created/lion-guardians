import Ember from 'ember';
import config from '../config/environment';
import {defaultLocation} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  classNames: ['lg-google-map'],
  defaultLocation: defaultLocation,
  marker: null,
  isVisible: Ember.computed.alias('showMaps'),

  showMaps: function() {
    return config.showMaps;
  }.property(),

  markers: function() {
    var marker = this.get('marker');

    if (marker) {
      return [marker];
    } else {
      return [];
    }
  }.property('marker')
});
