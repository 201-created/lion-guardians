import Ember from 'ember';

export function formatGender(gender) {
  if (gender) {
    return gender;
  } else {
    return '<unknown>';
  }
}

export default Ember.Handlebars.makeBoundHelper(formatGender);
