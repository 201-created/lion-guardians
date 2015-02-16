import Ember from 'ember';
import startApp from '../../helpers/start-app';
import {stubRequest} from '../../helpers/fake-server.js';
import { stubGetImageSet,
         stubGetOrganizations,
         stubImageSetJSON,
         stubGetUser,
         stubGetLions } from '../../helpers/fake-requests';

var application;

module('Acceptance: ImageSetLionSearch', {
  setup: function() {
    application = startApp();
    stubGetOrganizations();
    stubGetLions();
    stubGetImageSet(25);
    stubGetUser();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /image-set/lion-search', function() {
  expect(6);

  signInAndVisit('/image-set/25');
  click('.lion-search-button');

  andThen(function() {
    equal(currentPath(), 'image-set.lion-search');
    click('.lion-search');
  });

  andThen(function() {
    expectComponent('lg-lion-summary');
    expectNoElement('.row.active');
    click('.lg-lion-summary');
  });

  andThen(function() {
    expectElement('.row.active');
  });

    andThen(function() {
    click('button.associate-lion');
  });

  stubRequest('put', 'imageSets/:image_set_id', function(request){
    var json = stubImageSetJSON();
    json.id = request.params.image_set_id;
    json.lion_id = 2;

    ok(true, 'put update image set api called');
    json.lion_id = 2;

    return this.success(json);
  });

  andThen(function() {
    equal(currentURL(), '/lion/2');
  });
});
