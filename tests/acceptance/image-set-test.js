import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubRequest } from '../helpers/fake-server';
import { stubGetOrganizations, stubImageSetJSON } from '../helpers/fake-requests';

var application, imageSetJSON;

module('Acceptance: ImageSet', {
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

test('visiting /image-set with no current user', function() {
  redirectsToLogin('/image-set/24');
});

test('visiting /image-set', function() {
  signIn();
  visit('/image-set/24');

  andThen(function() {
    equal(currentPath(), 'image-set.index');
    equal(currentURL(), '/image-set/24');

    expectComponent('lg-image-set-editor');
    expectComponent('lg-image-gallery');

    expect('.edit-save-button button:contains(Edit)', 1);
    expect('.edit-save-button button:contains(Save)', 0);
    click('.edit-save-button button');
  });

  andThen(function() {
    fillIn('.lg-image-set-editor-gender', 'female');

    stubRequest('get', '/users/1', function(request){
      return this.success({
        id: 1,
        email: "isaac@201.com"
      });
    });

    stubRequest('put', '/imageSets/24', function(request){
      imageSetJSON.gender = 'female';
      return this.success(imageSetJSON);
    });
  });

  andThen(function() {
    expect('.edit-save-button button:contains(Edit)', 0);
    expect('.edit-save-button button:contains(Save)', 1);
    click('.edit-save-button button');
  });

  andThen(function() {
    equal(find('li.lg-image-set-editor-gender').text(), 'Gender: female');
  });
});
