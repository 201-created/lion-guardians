import Ember from 'ember';
import config from '../config/environment';
import ImageSetMarker from 'lion-guardians/models/image-set-marker';
import {defaultLocation} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  classNames: ['lg-google-map'],
  defaultLocation: defaultLocation,
  imageSet: null,
  isMarkerDraggable: false,

  isVisible: Ember.computed.alias('showMaps'),

  showMaps: function() {
    return config.showMaps;
  }.property(),

  isMarkerDraggableObserver: function() {
    var marker = this.get('marker'),
        isMarkerDraggable = this.get('isMarkerDraggable');

    if (marker) {
      marker.set('isDraggable', isMarkerDraggable);
    }
  }.observes('isMarkerDraggable'),

  marker: function() {
    var imageSet = this.get('imageSet'),
        isMarkerDraggable = this.get('isMarkerDraggable');
    if (imageSet) {
      return ImageSetMarker.create({
        imageSet: imageSet,
        isDraggable: isMarkerDraggable
      });
    }
    // not bound to isMarkerDraggable because this
    // will be updated separately in an observer above
  }.property('imageSet'),

  markers: function() {
    var marker = this.get('marker');

    if (marker) {
      return [marker];
    } else {
      return [];
    }
  }.property('marker')
});
