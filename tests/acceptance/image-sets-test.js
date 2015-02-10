import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubGetOrganizations, stubGetImageSets, stubDeleteImageSets } from '../helpers/fake-requests';

var application;

module('Acceptance: ImageSets', {
  setup: function() {
    application = startApp();
    stubGetImageSets();
    stubGetOrganizations();
    stubDeleteImageSets();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /image-sets', function() {
  signIn();
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

test('delete /image-set/:id', function() {
  signIn();
  visit('/image-sets');

  andThen(function() {
    equal(currentPath(), 'image-sets.index');
    expectComponent('lg-image-set-summary');
    expect('.image-set-summary:contains(24)', 1);
  });

  andThen(function() {
    click('.lg-image-set-summary-link');
  });

  andThen(function() {
    equal(currentURL(), '/image-set/24');
    click('.image-set-save-or-delete button:last-child');
  });

  andThen(function() {
    equal(currentURL(), '/image-sets');
    expect('.image-set-summary:contains(24)', 0);
  });
});
