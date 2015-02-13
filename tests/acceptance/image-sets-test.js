import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubGetOrganizations, stubGetImageSets, stubCvResultJSON, stubGetImageSetsWithCvResults } from '../helpers/fake-requests';
import { stubRequest } from '../helpers/fake-server';

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
  signInAndVisit('/image-sets');

  andThen(function() {
    equal(currentPath(), 'image-sets.index');
    expectComponent('lg-lion-search');
    expectComponent('lg-selectable');
    expectElement('.image-set-id');

    expectNoElement('.row.active');
    expectElement('.view-image-set.disabled');
  });

  andThen(function() {
    click('.image-set-id');
  });

  andThen(function() {
    expectElement('.row.active');
    click('button.view-image-set');
  });

  andThen(function() {
    equal(currentURL(), '/image-set/24');
  });
});

test('delete /image-set/:id', function() {
  expect(7);

  stubRequest('delete', '/imageSets/24', function(request){
    ok(true, 'delete api was called');
    return this.noContent(204);
  });

  signInAndVisit('/image-sets');

  andThen(function() {
    equal(currentPath(), 'image-sets.index');
    expect('.image-set-id:contains(24)', 1);
    expectElement('button.delete.disabled');
  });

  andThen(function() {
    click('.image-set-id');
  });

  andThen(function() {
    expectElement('button.delete');
    expectNoElement('button.delete.disabled');
    expectElement('.row.active');
    click('button.delete');
  });

  andThen(function() {
    equal(currentURL(), '/image-sets');
    expect('.image-set-id:contains(24)', 0);
  });
});

test('view cv results', function() {
  expect(8);

  stubGetImageSetsWithCvResults();

  stubRequest('get', '/cvResults', function(request) {
    deepEqual(request.queryParams, {image_set_id: '24'});
    ok(true, 'cv-results api called');
    return this.success({
      _embedded: {
        cv_results: [
          stubCvResultJSON()
        ]
      }
    });
  });

  signInAndVisit('/image-sets');

  andThen(function() {
    equal(currentPath(), 'image-sets.index');
    expect('.image-set-id:contains(24)', 1);
    expectElement('button.view-cv.disabled');
  });

  andThen(function() {
    click('.image-set-id');
  });

  andThen(function() {
    expectElement('button.view-cv');
    expectNoElement('button.view-cv.disabled');
    expectElement('.row.active');
    click('button.view-cv');
  });

  andThen(function() {
    equal(currentURL(), '/image-set/24/cv-results');
  });
});

test('test request CV', function() {
  expect(6);

  stubRequest('post', '/cvRequests', function(request){
    ok(true, 'cv request post api was called');
    return this.noContent(201);
  });

  signInAndVisit('/image-sets');

  andThen(function() {
    equal(currentPath(), 'image-sets.index');
    expect('.image-set-id:contains(24)', 1);
    expectElement('button.request-cv.disabled');
  });

  andThen(function() {
    click('.image-set-id');
  });

  andThen(function() {
    expectElement('button.request-cv');
    expectNoElement('button.request-cv.disabled');
    expectElement('.row.active');
    click('button.request-cv');
  });
});
