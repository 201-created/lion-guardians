import Ember from 'ember';

function invalidYear(year) {
  const currentYear = new Date().getFullYear();
  return (year < 1980) || (year > currentYear);
}

function invalidMonth(month) {
  return (month < 1) || (month > 12);
}

function invalidDay(day) {
  return (day < 1) || (day > 31);
}

export default Ember.Component.extend({
  value: null,
  year: null,
  month: null,
  day: null,

  init() {
    this._super(...arguments);
    this._setInitialValues();
  },

  _setInitialValues() {
    const value = this.get('value');
    if (!value) { return; }

    this.set('year', value.getFullYear());
    this.set('month', value.getMonth() + 1);
    this.set('day', value.getDate());
  },

  observeFields: function(){
    const year = parseInt(this.get('year'), 10);
    const month = parseInt(this.get('month'), 10);
    const day = parseInt(this.get('day'), 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return;
    }
    if (invalidYear(year)) { return; }
    if (invalidMonth(month)) { return; }
    if (invalidDay(day)) { return; }

    this.set('value', new Date(year, month-1, day));
  }.observes('year', 'month', 'day')
});
