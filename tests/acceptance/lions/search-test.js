import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { stubRequest } from '../../helpers/fake-server';
import { stubGetOrganizations, stubGetLions } from '../../helpers/fake-requests';

var application;

module('Acceptance: LionsSearch', {
  setup: function() {
    application = startApp();

    stubGetOrganizations();
    stubGetLions();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
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

test('searching', function() {
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
