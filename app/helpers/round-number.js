import Ember from 'ember';

export function roundNumber(input, options) {
  var precision = Ember.get(options, 'hash.precision') || '0';
  precision = parseInt(precision, 10);

  return Number(input).toFixed(precision);
}

export default Ember.Handlebars.makeBoundHelper(roundNumber);
