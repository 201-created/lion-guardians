/* global moment */

import Ember from 'ember';
import {dobSearchOptions} from 'lion-guardians/utils/units';
import parseAgeRange from 'lion-guardians/utils/parse-age-range';

export default Ember.Component.extend({
  classNames: ['lg-dob-search-selector'],
  dobSearchOptions: dobSearchOptions,
  selectedDobOption: dobSearchOptions[0].value,

  selectedSearchDateStart: null,
  selectedSearchDateEnd: null,

  updateSelectedDates: function() {
    if (this.get('selectedDobOption')) {
      var [minimumAge, maximumAge] = parseAgeRange(this.get('selectedDobOption'));

      var searchDateStart = null, searchDateEnd = null;
      if (minimumAge === 0 && maximumAge === 0) {
        // special case for all ages
        // do nothing and pass 0 up
      } else {
        searchDateStart = moment().subtract(maximumAge, 'years').toDate();
        searchDateEnd = moment().subtract(minimumAge, 'years').toDate();
      }

      this.set('selectedSearchDateStart', searchDateStart);
      this.set('selectedSearchDateEnd', searchDateEnd);
    }
  }.observes('selectedDobOption')
});
