import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  dateOfBirth: DS.attr('date'),
  gender: DS.attr('string'),
  imageSets: DS.hasMany('image-set', {async:true}),
  primaryImageSet: DS.belongsTo('image-set', {async:true}),
  organization: DS.belongsTo('organization', {async:true})
});
