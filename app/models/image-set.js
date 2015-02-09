import DS from 'ember-data';

export default DS.Model.extend({
  mainImage: DS.belongsTo('image'),
  age: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  gender: DS.attr('string'),
  isVerified: DS.attr('boolean'),
  hasCvResults: DS.attr('boolean'),
  images: DS.hasMany('images'),
  user: DS.belongsTo('user', {async: true}),
  uploadingOrganization: DS.belongsTo('organization'),

  addImage: function(url, isPublic, imageType) {
    var image = this.store.createRecord('image', {
      url: url,
      isPublic: isPublic,
      imageType: imageType
    });

    this.get('images').pushObject(image);
  }
});
