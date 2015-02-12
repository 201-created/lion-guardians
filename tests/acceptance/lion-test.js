import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubRequest } from '../helpers/fake-server';
import { stubGetOrganizations } from '../helpers/fake-requests';

var application;

module('Acceptance: Lion', {
  setup: function() {
    application = startApp();

    stubGetOrganizations();

    stubRequest('get', '/lions/2', function(request){
      return this.success({
        id: 2,
        name: "Simba",
        primary_image_set_id: 24,
        _embedded: {
          image_sets: [
            {
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
            }
          ],
          organization: {
            id: 1,
            name: "Lion Guardians"
          }
        }
      });
    });
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /lion/2 with no current user', function() {
  redirectsToLogin('/lion/2');
});

test('visiting /lion/2', function() {
  signIn();
  visit('/lion/2');

  andThen(function() {
    equal(currentPath(), 'lion.index');
    equal(currentURL(), '/lion/2');

    expectComponent('lg-image-set-editor');
    expectComponent('lg-image-gallery');
  });
});
