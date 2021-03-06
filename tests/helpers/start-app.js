import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import registerAcceptanceTestHelpers from './201-created/register-acceptance-test-helpers';
import config from '../../config/environment';

// register sign in helpers
import './sign-in';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    registerAcceptanceTestHelpers();
    application.injectTestHelpers();
  });

  return application;
}
