import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  dateOfBirth: DS.attr('date'),
  gender: DS.attr('string'),
  imageSets: DS.hasMany('image-set'),
  primaryImageSet: DS.belongsTo('image-set'),
  organization: DS.belongsTo('organization', {async:true})
});
