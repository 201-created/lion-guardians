import DS from 'ember-data';

export default DS.Transform.extend({
  // value like '2015-02-05'
  deserialize: function(value) {
    if (value) {
      let [year, month, day] = value.split('-');
      year = parseInt(year, 10);
      month = parseInt(month, 10);
      day = parseInt(day, 10);

      return new Date(year, month-1, day);
    }
  },

  // value is a Date, if it exists
  serialize: function(value) {
    if (value) {
      const year = value.getFullYear();
      const month = value.getMonth() + 1;
      const day = value.getDate();
      return [year, month, day].join('-');
    }
  }
});
