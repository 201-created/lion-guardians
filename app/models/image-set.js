/* global moment */

import Ember from 'ember';
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
  lionless: Ember.computed.not('lion'),
  uploadingOrganization: DS.belongsTo('organization'),
  organization: DS.belongsTo('organization'),
  cvResults: DS.hasMany('cv-results', {async: true}),
  cvRequest: DS.belongsTo('cv-request', {async: true}),
  age: function() {
    if (this.get('dateOfBirth')) {
      return moment(this.get('dateOfBirth')).fromNow(true) + " old";
    }
  }.property('dateOfBirth'),

  isPrimary: function() {
    return this === this.get('lion.primaryImageSet');
  }.property('lion'),

  cvRequestPending: function() {
    return this.get('hasCvRequest') && !this.get('hasCvResults');
  }.property('hasCvRequest', 'hasCvResults'),

  status: function() {
    var hasCvResults = this.get('hasCvResults'),
        lion = this.get('lion'),
        isVerified = this.get('isVerified'),
        cvRequestPending = this.get('cvRequestPending'),
        status = [];

    if (hasCvResults && lion) {
      status.pushObject('Has CV Results');
      status.pushObject(isVerified ? 'Verified' : 'Unverified');
    } else if (hasCvResults) {
      status.pushObject('Has CV Results');
    } else if (lion) {
      status.pushObject(isVerified ? 'Verified' : 'Unverified');
    }

    if (cvRequestPending) {
      status.pushObject('CV Request Pending');
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
