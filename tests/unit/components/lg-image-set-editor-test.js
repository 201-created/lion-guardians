import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

var oldConfirm;

moduleForComponent('lg-image-set-editor', 'LgImageSetEditorComponent', {
  needs: ['component:lg-google-map', 'component:lg-dob-selector'],

  setup: function() {
    oldConfirm = window.confirm;
    window.confirm = function() {
      return true;
    };
  },
  teardown: function() {
    window.confirm = oldConfirm;
  }
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
  var dateOfBirth = new Date(),
      latitude = 15,
      longitude = 20,
      organization = Ember.Object.create({name: '201'}),
      gender = 'male',
      isVerified = true;

  var imageSet = Ember.Object.create({
    dateOfBirth: dateOfBirth,
    latitude: latitude,
    longitude: longitude,
    organization: organization,
    gender: gender,
    isVerified: isVerified
  });

  var newDateOfBirth = new Date(),
      newLatitude = 25,
      newLongitude = 30,
      newOrganization = Ember.Object.create({name: 'LG'}),
      newGender = 'female';

  var component = this.subject({
    imageSet: imageSet,
    isEditing: true,
    selectedDob: newDateOfBirth,
    selectedLatitude: newLatitude,
    selectedLongitude: newLongitude,
    selectedOrganization: newOrganization,
    selectedGender: newGender
  });

  component.send('finishEditing');
  equal(component.get('isEditing'), false);
  equal(imageSet.get('dateOfBirth'), newDateOfBirth);
  equal(imageSet.get('latitude'), newLatitude);
  equal(imageSet.get('longitude'), newLongitude);
  equal(imageSet.get('organization'), newOrganization);
  equal(imageSet.get('gender'), newGender);
  equal(imageSet.get('isVerified'), false, 'isVerified set to false when changing organization');

  component.setProperties({
    isEditing: true,
    selectedIsVerified: true
  });

  component.send('finishEditing');
  equal(imageSet.get('isVerified'), true, 'can change isVerified to true as long as it is independent of organization');
});

test('resetting values', function() {
  var dateOfBirth = new Date(),
      latitude = 15,
      longitude = 20,
      organization = Ember.Object.create({name: '201'}),
      gender = 'male',
      isVerified = false;

  var imageSet = Ember.Object.create({
    dateOfBirth: dateOfBirth,
    latitude: latitude,
    longitude: longitude,
    organization: organization,
    gender: gender,
    isVerified: isVerified
  });

  var newDateOfBirth = new Date(),
      newLatitude = 25,
      newLongitude = 30,
      newOrganization = Ember.Object.create({name: 'LG'}),
      newGender = 'female',
      newIsVerified = true;

  var component = this.subject({
    imageSet: imageSet,
    isEditing: true,
    selectedDob: newDateOfBirth,
    selectedLatitude: newLatitude,
    selectedLongitude: newLongitude,
    selectedOrganization: newOrganization,
    selectedGender: newGender,
    selectedIsVerified: newIsVerified
  });

  component.send('cancelEditing');
  equal(component.get('isEditing'), false);
  equal(imageSet.get('dateOfBirth'), dateOfBirth);
  equal(imageSet.get('latitude'), latitude);
  equal(imageSet.get('longitude'), longitude);
  equal(imageSet.get('organization'), organization);
  equal(imageSet.get('gender'), gender);
  equal(imageSet.get('isVerified'), isVerified);

  equal(component.get('selectedDob'), dateOfBirth);
  equal(component.get('selectedLatitude'), latitude);
  equal(component.get('selectedLongitude'), longitude);
  equal(component.get('selectedOrganization'), organization);
  equal(component.get('selectedGender'), gender);
  equal(component.get('selectedIsVerified'), isVerified);
});
