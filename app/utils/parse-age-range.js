import Ember from 'ember';

export default function(string) {
  Ember.assert('Must pass string to parseAgeRange', (typeof string === 'string'));

  var parts = string.split('-');

  Ember.assert('Invalid string passed to parseAgeRange', parts.length === 2);

  var minimumAge = parseInt(parts[0], 10),
      maximumAge = parseInt(parts[1], 10);
  return [minimumAge, maximumAge];
}
