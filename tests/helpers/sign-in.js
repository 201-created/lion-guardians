import Ember from 'ember';

Ember.Test.registerAsyncHelper('signIn', function(app){
  var session = app.__container__.lookup('torii:session');
  var sm = session.get('stateMachine');

  Ember.run(function(){
    var store = app.__container__.lookup('store:main');
    var user = store.push('user', {
      id: 'user1',
      email: 'stubbed-user@gmail.com',
    });
    sm.transitionTo('authenticated');
    session.set('content.currentUser', user);
  });
});
