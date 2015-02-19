import Ember from 'ember';
import moment from 'ember-moment/helpers/moment';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('lg-dob-selector', 'LgDobSelectorComponent', {
  setup: function() {
    this.container.register('view:select', Ember.Select);
  }
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
