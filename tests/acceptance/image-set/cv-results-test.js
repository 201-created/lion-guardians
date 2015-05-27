import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { stubRequest } from '../../helpers/fake-server';
import { stubGetCvResults,
         stubGetImageSet,
         stubImageSetJSON,
         stubGetOrganizations,
         stubGetSearchOptions,
         stubGetUser } from '../../helpers/fake-requests';

var application, imageSetJSON;

module('Acceptance: ImageSetCvResults', {
  setup: function() {
    application = startApp();

    imageSetJSON = stubImageSetJSON();
    imageSetJSON.id = 25;

    stubGetImageSet();
    stubGetSearchOptions();
    stubGetOrganizations();
    stubGetCvResults('25');
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /image-set/cv-results with no currentuser', function() {
  redirectsToLogin('/image-set/25/cv-results');
});

test('visiting /image-set/cv-results', function() {
  expect(4);
  signInAndVisit('/image-set/25/cv-results');

  andThen(function() {
    equal(currentPath(), 'image-set.cv-results');
    expectElement('.cv-result-list');
    click('.cv-id:first-child');
  });

  andThen(function() {
    expectComponent('lg-lion-associator');
  });
});

test('visiting /image-set/cv-results and creating new lion', function() {
  expect(7);

  signInAndVisit('/image-set/25/cv-results');

  andThen(function() {
    click('.cv-id:first-child');
  });

  andThen(function() {
    expectElement('button.start-create-lion');
    click('button.start-create-lion');
  });

  andThen(function() {
    stubRequest('post', '/lions', function(){
      ok(true, 'lion create api called');
      return this.error(422, {
        errors: {name: 'must be unique'}
      });
    });

    fillIn('input[name="lionName"]', 'isaac');
    click('button.create-lion');
  });

  andThen(function() {
    expectElement('div.error');
    equal(find('div.error').last().text().trim(), "Lion name must be unique");
    click('button.start-create-lion');
  });

  andThen(function() {
    stubRequest('post', '/lions', function(){
      ok(true, 'lion create api called');
      return this.success({
        id: 3,
        name: 'isaac',
        primary_image_set_id: 25,
        _embedded: {
          image_sets: [
            imageSetJSON
          ],
          organization: {
            id: 1,
            name: "Lion Guardians"
          }
        }
      });
    });

    fillIn('input[name="lionName"]', 'isaac');
    click('button.create-lion');
  });

  andThen(function() {
    equal(currentURL(), '/lion/3');
  });
});

test('visiting /image-set/cv-results and associating with lion', function() {
  expect(6);

  signInAndVisit('/image-set/25/cv-results');
  stubGetUser();

  andThen(function() {
    click('.cv-id');
  });

  andThen(function() {
    stubRequest('put', '/imageSets/25', function(){
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

    stubRequest('put', '/imageSets/25', function(){
      ok(true, 'put update image set api called');
      imageSetJSON.lion_id = 2;

      return this.success(imageSetJSON);
    });

    click('button.associate-lion');
  });

  andThen(function() {
    equal(currentURL(), '/lion/2');
  });
});

test('visiting /image-set/cv-results, cvResult associated with lion doesnt give option to change', function() {
  // imageSet 24 is already associated with a lion
  stubGetCvResults('24');

  signInAndVisit('/image-set/24/cv-results');

  andThen(function() {
    equal(currentPath(), 'image-set.cv-results');
    expectElement('.cv-result-list');
    click('.cv-result-list .lion-summary-item .cv-id');
  });

  andThen(function() {
    expectElement('.lion-associator-control-panel');
    expectNoElement('.button.associate-lion');
    expectNoElement('.button.start-create-lion');
  });
});
