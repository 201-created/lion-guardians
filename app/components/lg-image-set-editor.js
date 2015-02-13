import Ember from 'ember';
import {genders} from 'lion-guardians/utils/units';
import ImageSetMarker from 'lion-guardians/models/image-set-marker';

export default Ember.Component.extend({
  genders: genders,
  isEditing: false,
  editingEnabled: false,
  imageSet: null,
  organizations: null,

  selectedAge: Ember.computed.reads('imageSet.age'),
  selectedLatitude: Ember.computed.reads('imageSet.latitude'),
  selectedLongitude: Ember.computed.reads('imageSet.longitude'),
  selectedOrganization: Ember.computed.reads('imageSet.uploadingOrganization'),
  selectedGender: Ember.computed.reads('imageSet.gender'),
  selectedIsVerified: Ember.computed.reads('imageSet.isVerified'),

  mapMarker: function() {
    return ImageSetMarker.create({
      component: this
    });
  }.property(),

  resetValues: function() {
    var imageSet = this.get('imageSet');

    this.setProperties({
      selectedAge: imageSet.get('age'),
      selectedLatitude: imageSet.get('latitude'),
      selectedLongitude: imageSet.get('longitude'),
      selectedOrganization: imageSet.get('uploadingOrganization'),
      selectedGender: imageSet.get('gender'),
      selectedIsVerified: imageSet.get('isVerified')
    });
  },

  updateValues: function() {
    var imageSet = this.get('imageSet');

    imageSet.setProperties({
      age: this.get('selectedAge'),
      latitude: this.get('selectedLatitude'),
      longitude: this.get('selectedLongitude'),
      uploadingOrganization: this.get('selectedOrganization'),
      gender: this.get('selectedGender'),
      isVerified: this.get('selectedIsVerified')
    });
  },

  actions: {
    startEditing: function() {
      this.set('isEditing', true);
    },

    cancelEditing: function() {
      this.resetValues();
      this.set('isEditing', false);
    },

    finishEditing: function() {
      this.set('isSavingImageSet', true);
      this.updateValues();

      var imageSet = this.get('imageSet'),
          component = this;
      if (imageSet.get('id')) {
        imageSet.save().then(function() {
          component.setProperties({
            isEditing: false,
            isSavingImageSet: false
          });
        });
      } else {
        this.setProperties({
          isEditing: false,
          isSavingImageSet: false
        });
      }
    }
  }
});
