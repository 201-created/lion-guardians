/* global moment:true */

import Ember from 'ember';
import { dobSearchOptions } from 'lion-guardians/utils/units';
import parseAgeRange from 'lion-guardians/utils/parse-age-range';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

var oldMoment;

moduleForComponent('lg-dob-search-selector', 'LgDobSearchSelectorComponent', {
  setup: function() {
    this.container.register('view:select', Ember.Select);

    oldMoment = moment;
    moment = function() {
      return oldMoment("2015-01-01");
    };
  },
  teardown: function() {
    moment = oldMoment;
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

test('it does not set start or end when no age selected', function(){
  expect(2);
  var component = this.subject();

  component.set('selectedDobOption', null);
  equal(component.get('selectedSearchDateEnd'), null);
  equal(component.get('selectedSearchDateStart'), null);
});

test('it does not set start or end when minimum and max are 0', function(){
  expect(2);
  var component = this.subject();

  component.set('selectedDobOption', '0-0');
  equal(component.get('selectedSearchDateEnd'), null);
  equal(component.get('selectedSearchDateStart'), null);
});

test('it sets selected start and end for age for very young lions', function(){
  expect(3);
  var component = this.subject();
  var selectedOption = dobSearchOptions[1].value;

  var [minimumAge, maximumAge] = parseAgeRange(selectedOption);

  var startDate = moment().subtract(maximumAge, 'years').toDate();
  var endDate = moment().subtract(minimumAge, 'years').toDate();

  component.set('selectedDobOption', selectedOption);
  deepEqual(component.get('selectedDobOption'), selectedOption);
  deepEqual(component.get('selectedSearchDateStart'), startDate);
  deepEqual(component.get('selectedSearchDateEnd'), endDate);
});

test('it sets params for age for very old lions', function(){
  expect(3);
  var component = this.subject();
  var numOptions = dobSearchOptions.length;
  var selectedOption = dobSearchOptions[numOptions - 1].value;

  var [minimumAge, maximumAge] = parseAgeRange(selectedOption);

  var startDate = moment().subtract(maximumAge, 'years').toDate();
  var endDate = moment().subtract(minimumAge, 'years').toDate();

  component.set('selectedDobOption', selectedOption);
  equal(component.get('selectedDobOption'), selectedOption);
  deepEqual(component.get('selectedSearchDateStart'), startDate, 'start date string matches startdate var');
  deepEqual(component.get('selectedSearchDateEnd'), endDate, 'end date string matches enddate var');
});

test('it sets params for age for middle age lions', function(){
  expect(3);
  var component = this.subject();
  var selectedOption = dobSearchOptions[5].value;

  var [minimumAge, maximumAge] = parseAgeRange(selectedOption);

  var startDate = moment().subtract(maximumAge, 'years').toDate();
  var endDate = moment().subtract(minimumAge, 'years').toDate();

  component.set('selectedDobOption', selectedOption);
  equal(component.get('selectedDobOption'), selectedOption);
  deepEqual(component.get('selectedSearchDateStart'), startDate);
  deepEqual(component.get('selectedSearchDateEnd'), endDate);
});
