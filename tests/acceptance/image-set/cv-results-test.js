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
    expectElement('button:contains(Associate Lion)');
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
    expectNoElement('.button.start-associate-lion');
  });
});
