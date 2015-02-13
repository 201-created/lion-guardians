import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('lg-image-set-editor', 'LgImageSetEditorComponent', {
  needs: ['component:lg-google-map']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('updating values', function() {
  var age = 10,
      latitude = 15,
      longitude = 20,
      uploadingOrganization = '201',
      gender = 'male',
      isVerified = false;

  var imageSet = Ember.Object.create({
    age: age,
    latitude: latitude,
    longitude: longitude,
    uploadingOrganization: uploadingOrganization,
    gender: gender,
    isVerified: isVerified
  });

  var newAge = 20,
      newLatitude = 25,
      newLongitude = 30,
      newUploadingOrganization = 'LG',
      newGender = 'female',
      newIsVerified = true;

  var component = this.subject({
    imageSet: imageSet,
    isEditing: true,
    selectedAge: newAge,
    selectedLatitude: newLatitude,
    selectedLongitude: newLongitude,
    selectedOrganization: newUploadingOrganization,
    selectedGender: newGender,
    selectedIsVerified: newIsVerified
  });

  component.send('finishEditing');
  equal(component.get('isEditing'), false);
  equal(imageSet.get('age'), newAge);
  equal(imageSet.get('latitude'), newLatitude);
  equal(imageSet.get('longitude'), newLongitude);
  equal(imageSet.get('uploadingOrganization'), newUploadingOrganization);
  equal(imageSet.get('gender'), newGender);
  equal(imageSet.get('isVerified'), newIsVerified);
});

test('resetting values', function() {
  var age = 10,
      latitude = 15,
      longitude = 20,
      uploadingOrganization = '201',
      gender = 'male',
      isVerified = false;

  var imageSet = Ember.Object.create({
    age: age,
    latitude: latitude,
    longitude: longitude,
    uploadingOrganization: uploadingOrganization,
    gender: gender,
    isVerified: isVerified
  });

  var newAge = 20,
      newLatitude = 25,
      newLongitude = 30,
      newUploadingOrganization = 'LG',
      newGender = 'female',
      newIsVerified = true;

  var component = this.subject({
    imageSet: imageSet,
    isEditing: true,
    selectedAge: newAge,
    selectedLatitude: newLatitude,
    selectedLongitude: newLongitude,
    selectedOrganization: newUploadingOrganization,
    selectedGender: newGender,
    selectedIsVerified: newIsVerified
  });

  component.send('cancelEditing');
  equal(component.get('isEditing'), false);
  equal(imageSet.get('age'), age);
  equal(imageSet.get('latitude'), latitude);
  equal(imageSet.get('longitude'), longitude);
  equal(imageSet.get('uploadingOrganization'), uploadingOrganization);
  equal(imageSet.get('gender'), gender);
  equal(imageSet.get('isVerified'), isVerified);

  equal(component.get('selectedAge'), age);
  equal(component.get('selectedLatitude'), latitude);
  equal(component.get('selectedLongitude'), longitude);
  equal(component.get('selectedOrganization'), uploadingOrganization);
  equal(component.get('selectedGender'), gender);
  equal(component.get('selectedIsVerified'), isVerified);
});
