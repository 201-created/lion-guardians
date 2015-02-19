/* global moment */

import DS from 'ember-data';
import {defaultLocation} from 'lion-guardians/utils/units';

export default DS.Model.extend({
  mainImage: DS.belongsTo('image'),
  dateOfBirth: DS.attr('date'),
  latitude: DS.attr('number', {defaultValue: defaultLocation.latitude}),
  longitude: DS.attr('number', {defaultValue: defaultLocation.longitude}),
  gender: DS.attr('string'),
  isVerified: DS.attr('boolean'),
  hasCvResults: DS.attr('boolean'),
  hasCvRequest: DS.attr('boolean'),
  images: DS.hasMany('images'),
  user: DS.belongsTo('user', {async: true}),
  lion: DS.belongsTo('lion', {inverse: 'imageSets'}),
  uploadingOrganization: DS.belongsTo('organization'),
  organization: DS.belongsTo('organization'),
  cvResults: DS.hasMany('cv-results', {async: true}),
  cvRequest: DS.belongsTo('cv-request', {async: true}),
  age: function() {
    if (this.get('dateOfBirth')) {
      return moment(this.get('dateOfBirth')).fromNow(true) + " ago";
    }
  }.property('dateOfBirth'),

  cvRequestPending: function() {
    return this.get('hasCvRequest') && !this.get('hasCvResults');
  }.property('hasCvRequest', 'hasCvResults'),

  status: function() {
    var hasCvResults = this.get('hasCvResults'),
        lion = this.get('lion'),
        isVerified = this.get('isVerified'),
        cvRequestPending = this.get('cvRequestPending'),
        status = "";

    if (hasCvResults && lion) {
      status += 'Has CV Results, ';
      status += isVerified ? 'Verified' : 'Unverified';
    } else if (hasCvResults) {
      status = 'Has CV Results';
    } else if (lion) {
      status = isVerified ? 'Verified' : 'Unverified';
    }

    if (cvRequestPending) {
      status += ', CV Request Pending';
    }

    return status;
  }.property('hasCvResults', 'lion', 'isVerified', 'cvRequestPending'),

  addImage: function(url, isPublic, imageType) {
    var image = this.store.createRecord('image', {
      url: url,
      isPublic: isPublic,
      imageType: imageType
    });

    this.get('images').pushObject(image);
  }
});
