import Ember from 'ember';

export function roundNumber(input) {
  return parseInt(input, 10);
}

export default Ember.Handlebars.makeBoundHelper(roundNumber);
