import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubGetOrganizations, stubGetImageSets } from '../helpers/fake-requests';

var application;

module('Acceptance: ImageSets', {
  setup: function() {
    application = startApp();
    stubGetImageSets();
    stubGetOrganizations();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /image-sets', function() {
  visit('/image-sets');

  andThen(function() {
    equal(currentPath(), 'image-sets.index');
    expectComponent('lg-image-set-summary');
  });

  andThen(function() {
    click('.lg-image-set-summary-link');
  });

  andThen(function() {
    equal(currentURL(), '/image-set/24');
  });
});
