import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';
import { stubGetSearchOptions } from '../../helpers/fake-requests';
import { initialize } from 'lion-guardians/initializers/ember-moment';

var oldConfirm;

moduleForComponent('lg-lion-editor', 'LgLionEditorComponent', {
  needs: ['component:lg-google-map', 'component:lg-dob-selector'],

  setup: function(container) {
    oldConfirm = window.confirm;
    window.confirm = function() {
      return true;
    };

    Ember.run(function() {
      initialize(container);
    });

    stubGetSearchOptions();
  },
  teardown: function() {
    window.confirm = oldConfirm;
  }
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  equal(component._state, 'inDOM');
});
