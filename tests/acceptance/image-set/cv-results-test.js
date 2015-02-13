import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { stubRequest } from '../../helpers/fake-server';
import { stubGetCvResults,
         stubImageSetJSON,
         stubGetOrganizations,
         stubGetUser } from '../../helpers/fake-requests';

var application, imageSetJSON;

module('Acceptance: ImageSetCvResults', {
  setup: function() {
    application = startApp();

    imageSetJSON = stubImageSetJSON();
    imageSetJSON.id = 25;

    stubRequest('get', 'imageSets/:image_set_id', function(request){
      imageSetJSON.id = request.params.image_set_id;
      return this.success(imageSetJSON);
    });

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
  signInAndVisit('/image-set/25/cv-results');

  andThen(function() {
    equal(currentPath(), 'image-set.cv-results');
    expectComponent('lg-cv-result-summary');
    click('.select-cv-result');
  });

  andThen(function() {
    expectElement('.lg-image-set-summary');
  });
});

test('visiting /image-set/cv-results and creating new lion', function() {
  expect(3);

  signInAndVisit('/image-set/25/cv-results');

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

  andThen(function() {
    click('.select-cv-result');
  });

  andThen(function() {
    click('button.start-create-lion');
  });

  andThen(function() {
    fillIn('input[name="lionName"]', 'isaac');
    click('button.create-lion');
  });

  andThen(function() {
    equal(currentURL(), '/lion/3');
  });
});

test('visiting /image-set/cv-results and associating with lion', function() {
  expect(3);

  signInAndVisit('/image-set/25/cv-results');

  stubGetUser();
  stubRequest('put', '/imageSets/25', function(){
    ok(true, 'put update image set api called');
    imageSetJSON.lion_id = 2;

    return this.success(imageSetJSON);
  });

  andThen(function() {
    click('.select-cv-result');
  });

  andThen(function() {
    click('button.associate-lion');
  });

  andThen(function() {
    equal(currentURL(), '/lion/2');
  });
});

test('visiting /image-set/cv-results, cvResult associated with lion doesnt give option to change', function() {
  // imageSet 24 is already associated with a lion
  stubGetCvResults('24');
  stubRequest('get', 'imageSets/:image_set_id', function(request){
    imageSetJSON.id = request.params.image_set_id;
    return this.success(imageSetJSON);
  });

  signInAndVisit('/image-set/24/cv-results');

  andThen(function() {
    equal(currentPath(), 'image-set.cv-results');
    expectComponent('lg-cv-result-summary');
    click('.select-cv-result');
  });

  andThen(function() {
    expectNoElement('.button.associate-lion');
    expectNoElement('.button.start-create--lion');
  });
});
