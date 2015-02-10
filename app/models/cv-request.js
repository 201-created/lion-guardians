import DS from 'ember-data';

export default DS.Model.extend({
  imageSet: DS.belongsTo('image-set'),
  uploadingOrganization: DS.belongsTo('organization')
});
