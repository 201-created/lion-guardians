import Ember from 'ember';
import OrganizationRouteMixin from 'lion-guardians/mixins/organization-route';

module('OrganizationRouteMixin');

// Replace this with your real tests.
test('it works', function() {
  var OrganizationRouteObject = Ember.Object.extend(OrganizationRouteMixin);
  var subject = OrganizationRouteObject.create();
  ok(subject);
});
