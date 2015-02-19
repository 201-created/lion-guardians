/* global moment:true */

import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { stubRequest } from '../../helpers/fake-server';
import { stubGetOrganizations, stubGetLions } from '../../helpers/fake-requests';
import { dobSearchOptions } from 'lion-guardians/utils/units';
import parseAgeRange from 'lion-guardians/utils/parse-age-range';

var application, oldMoment;

module('Acceptance: LionsSearch', {
  setup: function() {
    application = startApp();

    stubGetOrganizations();
    stubGetLions();

    oldMoment = moment;
    moment = function() {
      return oldMoment("2015-01-01");
    };
  },
  teardown: function() {
    Ember.run(application, 'destroy');
    moment = oldMoment;
  }
});

test('visiting /lions/search with no current user', function() {
  redirectsToLogin('/lions/search');
});

test('visiting /lions/search', function() {
  signInAndVisit('/lions/search');

  andThen(function() {
    equal(currentPath(), 'lions.search');
  });

  andThen(function() {
    expectElement('.lion-search', 1);
    click('.lion-search');
  });

  andThen(function() {
    expectComponent('lg-lion-summary', 1);
    click('.lg-lion-summary');
  });

  andThen(function() {
    click('.view-lion');
  });

  andThen(function() {
    equal(currentURL(), '/lion/2');
  });
});

test('searching by gender', function() {
  expect(1);

  signInAndVisit('/lions/search');

  stubRequest('get', '/lions', function(request){

    deepEqual(request.queryParams, {gender: 'male'},  'api called with correct query string for searching by gender');

    return this.success({
      _embedded: {
        lions: []
      }
    });
  });

  andThen(function() {
    fillIn('.lg-lion-search-gender', 'male');
    click('.lion-search');
  });
});

test('searching by age', function() {
  expect(2);

  signInAndVisit('/lions/search');
  var ageSearchChoice = dobSearchOptions[3]; //6-9 years

  andThen(function() {
    fillIn('.lg-dob-search-selector', ageSearchChoice.value);
  });

  andThen(function() {
    expectElement('.lg-dob-search-selector:contains(' + ageSearchChoice.label + ')', 'DOB selector is filled in with 6-9 years');
  });

  andThen(function() {
    stubRequest('get', '/lions', function(request){
      var [minimumAge, maximumAge] = parseAgeRange(ageSearchChoice.value);
      var startDateString = '' + moment().subtract(maximumAge, 'years').toDate();
      var endDateString = '' + moment().subtract(minimumAge, 'years').toDate();

      deepEqual(request.queryParams,
                {dob_range_start: startDateString,
                 dob_range_end: endDateString},
                'api called with correct query string for searching by age');

      return this.success({
        _embedded: {
          lions: []
        }
      });
    });

    click('.lion-search');
  });
});
