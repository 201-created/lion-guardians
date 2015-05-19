import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubRequest } from '../helpers/fake-server';
import { stubLionJSON, stubImageSetJSON, stubGetOrganizations,
         stubGetUser, stubGetSearchOptions } from '../helpers/fake-requests';

var application, oldConfirm;

module('Acceptance: Lion', {
  setup: function() {
    application = startApp();

    stubGetOrganizations();
    stubGetSearchOptions();
    stubRequest('get', '/lions/2', function(request){
      return this.success(stubLionJSON());
    });

    oldConfirm = window.confirm;
    window.confirm = function() {
      return true;
    };
  },
  teardown: function() {
    Ember.run(application, 'destroy');
    window.confirm = oldConfirm;
  }
});

test('visiting /lion/2 with no current user', function() {
  redirectsToLogin('/lion/2');
});

test('visiting /lion/2', function() {
  signInAndVisit('/lion/2');

  andThen(function() {
    equal(currentPath(), 'lion.index');
    equal(currentURL(), '/lion/2');

    expectComponent('lg-image-set-editor');
    expectComponent('lg-mini-image-gallery');

    expectNoElement('.row.image-set.active');
    click('.mini-image-gallery');
  });

  andThen(function() {
    expectElement('.row.image-set.active');
    click('.view-image-set');
  });

  andThen(function() {
    equal(currentURL(), '/image-set/24');
  });
});

test('visiting /lion/2 and setting primary image set', function() {
  expect(2);
  signInAndVisit('/lion/2');

  click('.mini-image-gallery');

  andThen(function() {
    expectElement('.row.image-set.active');

    stubRequest('put', '/lions/2', function(request){
      ok(true, 'put api called');
      return this.success(stubLionJSON());
    });

    click('.make-primary');
  });
});

test('visiting /lion/2 and removing image set', function() {
  expect(2);
  stubGetUser();
  signInAndVisit('/lion/2');

  click('.mini-image-gallery');

  andThen(function() {
    expectElement('.row.image-set.active');

    stubRequest('put', '/imageSets/24', function(request){
      ok(true, 'put api called');
      return this.success(stubImageSetJSON());
    });

    click('.remove-image-set');
  });
});
