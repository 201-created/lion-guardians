import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';
import GooogleMapComponent from 'lion-guardians/components/google-map';

moduleForComponent('lg-google-map', 'LgGoogleMapComponent', {
  needs: ['component:google-map']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('creates and updates marker', function(){
  expect(5);
  var imageSet = Ember.Object.create({
    latitude: 10,
    longitude: 10
  });

  var component = this.subject({
    imageSet: imageSet
  });

  var marker = component.get('marker');
  ok(marker);
  equal(marker.get('lat'), imageSet.get('latitude'));
  equal(marker.get('lng'), imageSet.get('longitude'));

  equal(marker.get('isDraggable'), false);
  component.set('isMarkerDraggable', true);
  equal(marker.get('isDraggable'), true);
});
