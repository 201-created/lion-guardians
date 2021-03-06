/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lion-guardians',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    googleMap: {
      lazyLoad: true,
      apiKey: null // Set per environment below
    },
    showMaps: true,
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
    apiHost: 'http://lion-guardians-api.herokuapp.com',

    // The path to POST to to create a new token
    tokenPath: '/users/sign_in',

    // The key used to store the auth token
    authTokenKey: 'authToken',

    torii: {
      sessionServiceName: 'toriiSession',
      providers: {
        // The custom provider we use for token auth
        'lion-guardians': {}
      }
    },

    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline' *.googleapis.com",
      'font-src': "'self' *.gstatic.com",
      'img-src': "'self' localhost:5000 lion-guardians-production.s3.amazonaws.com lg-201-created-development.s3.amazonaws.com data: *.gstatic.com *.googleapis.com",
      'script-src': "'self' 'unsafe-eval' *.gstatic.com *.googleapis.com",
      'connect-src': "'self' localhost:5000 lion-guardians-production.s3.amazonaws.com lg-201-created-development.s3.amazonaws.com lion-guardians-api.herokuapp.com"
    }
  };

  if (environment === 'development') {
    // Comment on the next line to point to production API server
    ENV.apiHost = 'http://localhost:5000';

    ENV.googleMap.apiKey = 'AIzaSyCoc_T6TNxu5Mnw28aJleIm63fR7WzViUU';

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.apiHost = '';
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    ENV.authTokenKey = 'test-authToken';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.showMaps = false;
  }

  if (environment === 'production') {
    ENV.googleMap.apiKey = 'AIzaSyCyBbvflCLH9nmebwUVm0IjrYObWZ345NA';
  }

  ENV.adminPath = ENV.apiHost + '/admin';

  return ENV;
};
