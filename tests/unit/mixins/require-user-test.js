import Ember from 'ember';
import RequireUserMixin from 'lion-guardians/mixins/require-user';

module('RequireUserMixin');

// Replace this with your real tests.
test('it works', function() {
  var RequireUserObject = Ember.Object.extend(RequireUserMixin);
  var subject = RequireUserObject.create();
  ok(subject);
});
