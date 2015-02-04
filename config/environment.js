/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lion-guardians',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline'",
      'img-src': "'self' localhost:5000 lg-201-created-development.s3.amazonaws.com",
      'connect-src': "'self' localhost:5000 lg-201-created-development.s3.amazonaws.com"
    }
  };

  if (environment === 'development') {
    ENV.apiURL = 'http://localhost:5000';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.apiURL = '';
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.apiURL = 'http://lion-guardians-api.herokuapp.com';
  }

  return ENV;
};
