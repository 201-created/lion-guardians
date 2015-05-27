import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { stubRequest } from '../../helpers/fake-server';
import { stubGetOrganizations, stubImageSetJSON,
       stubGetSearchOptions } from '../../helpers/fake-requests';

var application, imageSetJSON;

module('Acceptance: ImageSetCvRequest', {
  setup: function() {
    application = startApp();

    stubGetOrganizations();
    stubGetSearchOptions();

    imageSetJSON = stubImageSetJSON();
    stubRequest('get', '/imageSets/24', function(request){
      return this.success(imageSetJSON);
    });
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

