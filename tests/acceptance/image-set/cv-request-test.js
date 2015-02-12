import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { stubRequest } from '../../helpers/fake-server';
import { stubGetOrganizations, stubImageSetJSON } from '../../helpers/fake-requests';

var application, imageSetJSON;

module('Acceptance: ImageSetCvRequest', {
  setup: function() {
    application = startApp();

    stubGetOrganizations();

    imageSetJSON = stubImageSetJSON();
    stubRequest('get', '/imageSets/24', function(request){
      return this.success(imageSetJSON);
    });
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /image-set/24 and requesting CV', function() {
  signIn();
  expect(3);

  visit('/image-set/24');

  stubRequest('post', '/cvRequests', function(request) {
    ok(true, 'cv request post api called');

    return this.success({
      id: 1,
      status: 'created'
    });
  });

  andThen(function() {
    expectElement('button.request-cv');
    click('.request-cv');
  });

  andThen(function() {
    expectElement('.cv-request-pending');
  });
});

test('visiting /image-set/24 and seeing request pending', function() {
  signIn();
  expect(1);

  imageSetJSON.cv_request_id = '1';

  stubRequest('get', '/cvRequests/1', function(request){
    return this.success({
      id: 1,
      status: 'created'
    });
  });

  visit('/image-set/24');

  andThen(function() {
    expectElement('.cv-request-pending');
  });
});
