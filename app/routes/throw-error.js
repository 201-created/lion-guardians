import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    throw new Error('generated error from "throw-error"');
  }
});
