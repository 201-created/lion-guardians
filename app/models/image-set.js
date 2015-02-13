import DS from 'ember-data';
import {defaultLocation} from 'lion-guardians/utils/units';

export default DS.Model.extend({
  mainImage: DS.belongsTo('image'),
  age: DS.attr('string'),
  latitude: DS.attr('number', {defaultValue: defaultLocation.latitude}),
  longitude: DS.attr('number', {defaultValue: defaultLocation.longitude}),
  gender: DS.attr('string'),
  isVerified: DS.attr('boolean'),
  hasCvResults: DS.attr('boolean'),
  images: DS.hasMany('images'),
  user: DS.belongsTo('user', {async: true}),
  lion: DS.belongsTo('lion', {inverse: 'imageSets'}),
  uploadingOrganization: DS.belongsTo('organization'),
  cvResults: DS.hasMany('cv-results', {async: true}),
  cvRequest: DS.belongsTo('cv-request', {async: true}),

  status: function() {
    var hasCvResults = this.get('hasCvResults'),
        lion = this.get('lion'),
        isVerified = this.get('isVerified'),
        status = "";

    if (hasCvResults && lion) {
      status += 'Has CV Results, ';
      status += isVerified ? 'Verified' : 'Unverified';
    } else if (hasCvResults) {
      status = 'Has CV Results';
    } else if (lion) {
      status = isVerified ? 'Verified' : 'Unverified';
    }

    return status;
  }.property('hasCvResults', 'lion', 'isVerified'),

  addImage: function(url, isPublic, imageType) {
    var image = this.store.createRecord('image', {
      url: url,
      isPublic: isPublic,
      imageType: imageType
    });

    this.get('images').pushObject(image);
  }
});
