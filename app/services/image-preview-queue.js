import Ember from 'ember';

export default Ember.Object.extend({
  setupVars: function(){
    this.promise = Ember.RSVP.resolve();
  }.on('init'),

  addTask: function(callback){
    this.promise = this.promise.then(function(){
      return new Ember.RSVP.Promise(function(resolve){
        callback().then(function(){
          Ember.run.later(null, resolve, 50);
        });
      });
    });
  }
});
