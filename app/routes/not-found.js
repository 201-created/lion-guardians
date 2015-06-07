import Ember from 'ember';

export default Ember.Route.extend({
  model({catchall: urlName}){
    return {urlName};
  }
});
