import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubRequest } from '../helpers/fake-server';
import { stubGetOrganizations } from '../helpers/fake-requests';
import config from '../../config/environment';

var application;

let url = '/login';

module('Acceptance: Log in', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test(`visit ${url} shows UI`, () => {
  visit(url);

  andThen( () => {
    equal(currentPath(), 'login');

    ok( find('input[name="email"]').length,
        'email input');
    ok( find('input[name="password"]').length,
        'password input');

    ok( find('button:contains(Log In)').length,
        'has log in button');
  });
});

test(`visit ${url} posts data to create token`, () => {
  let email = 'abc@example.com',
      password = 'blahblah',
      token = 'abctoken',
      userId = '1';

  stubRequest('post', config.tokenPath, function(request){
    ok('calls POST');
    var json = this.json(request)['user'];

    equal(json.email, email);
    equal(json.password, password);

    return this.success({
      email: email,
      user: userId,
      token: token
    });
  });

  stubRequest('get', `/users/${userId}`, function(request){
    ok(true, 'gets user');
    return this.success({
      id: userId,
      email: email
    });
  });

  visit(url);
  andThen( () => {
    ok( !find('.nav:contains(Logged in)').length,
        'precond - navbar does not show logged in');

    fillIn('input[name="email"]', email);
    fillIn('input[name="password"]', password);
    click('button:contains(Log In)');
  });

  andThen( () => {
    equal(currentPath(), 'dashboard');
    ok( find('.nav:contains(Logged in)').length,
        'navbar shows logged in');
  });
});

test(`visit ${url} while logged in redirects to dashboard`, () => {
  signIn();
  visit(url);
  andThen( () => {
    equal(currentPath(), 'dashboard');
  });
});
