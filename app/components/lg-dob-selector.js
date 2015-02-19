/* global moment */

import Ember from 'ember';
import {dobOptions} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  dobOptions: dobOptions,
  selectedDobOption: dobOptions[0].value,
  selectedDob: null,
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),

  setInitialValue: function() {
    var dob = this.get('selectedDob'),
        options = this.get('dobOptions');

    for (var i=0; i < options.get('length'); i++) {
      var option = options.objectAt(i);
      var newDate = moment().subtract(option.value, 'years').toDate();
      if (newDate > dob) {
        this.set('selectedDobOption', option.value);
      } else {
        break;
      }
    }
  }.on('didInsertElement'),

  updateSelectedDob: function() {
    var dob = this.get('selectedDobOption');

    var newDate = moment().subtract(dob, 'years').toDate();
    this.set('selectedDob', newDate);
  }.observes('selectedDobOption')
});
