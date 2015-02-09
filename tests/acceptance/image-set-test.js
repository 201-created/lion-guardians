import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubRequest } from '../helpers/fake-server';
import { stubGetOrganizations } from '../helpers/fake-requests';

var application, imageSetJSON;

module('Acceptance: ImageSet', {
  setup: function() {
    application = startApp();

    stubGetOrganizations();

    imageSetJSON = {
      id: 24,
      is_verified: false,
      latitude: null,
      longitude: null,
      gender: "male",
      age: "24",
      main_image_id: 49,
      user_id: 1,
      _embedded: {
        images: [
          {
            id: 49,
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==", // red dot
            image_type: "full-body",
            is_public: true
          }
        ],
        uploading_organization: {
          id: 1,
          name: "Lion Guardians"
        }
      }
    };

    stubRequest('get', '/imageSets/24', function(request){
      return this.success(imageSetJSON);
    });
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /image-set', function() {
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
