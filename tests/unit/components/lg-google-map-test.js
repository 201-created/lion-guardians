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
