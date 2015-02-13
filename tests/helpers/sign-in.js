import Ember from 'ember';

Ember.Test.registerAsyncHelper('signIn', function(app){
  var session = app.__container__.lookup('torii:session');
  var sm = session.get('stateMachine');

  Ember.run(function(){
    var store = app.__container__.lookup('store:main');
    var organization = store.push('organization', {
      id: '1',
      name: 'Organization 1'
    });

    var user = store.push('user', {
      id: 'user1',
      email: 'stubbed-user@gmail.com',
      organization: organization
    });
    sm.transitionTo('authenticated');
    session.set('content.currentUser', user);
  });
});

Ember.Test.registerAsyncHelper('redirectsToLogin', function(app, path){
  visit(path);
  andThen(function() {
    equal(currentPath(), 'login');
  });
});


Ember.Test.registerAsyncHelper('signInAndVisit', function(app, path){
  signIn();
  visit(path);
});
