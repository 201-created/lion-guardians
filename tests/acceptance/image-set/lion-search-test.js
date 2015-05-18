import Ember from 'ember';
import startApp from '../../helpers/start-app';
import {stubRequest} from '../../helpers/fake-server';
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
  expect(9);

  signInAndVisit('/image-set/25');
  click('.lion-search-button');

  andThen(function() {
    equal(currentPath(), 'image-set.lion-search');
    click('.lion-search');
  });

  andThen(function() {
    expectComponent('lg-lion-summary');
    expectNoElement('.row.lion.active');
    click('.lg-lion-summary');
  });

  andThen(function() {
    expectElement('.row.lion.active');

    stubRequest('put', '/imageSets/:image_set_id', function(){
      ok(true, 'put update image set api called');
      return this.error(422, {
        errors: {lion: 'already associated with different lion'}
      });
    });

    click('button.associate-lion');
  });

  andThen(function() {
    expectElement('div.error');
    equal(find('div.error').last().text().trim(), "Image Set lion already associated with different lion");

    stubRequest('put', 'imageSets/:image_set_id', function(request){
      var json = stubImageSetJSON();
      json.id = request.params.image_set_id;
      json.lion_id = 2;

      ok(true, 'put update image set api called');
      json.lion_id = 2;

      return this.success(json);
    });

    click('button.associate-lion');
  });

  andThen(function() {
    equal(currentURL(), '/lion/2');
  });
});
