import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  currentOrganization: Ember.computed.alias('currentUser.organization')
});
