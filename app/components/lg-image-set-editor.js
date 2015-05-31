import Ember from 'ember';
import {genders} from 'lion-guardians/utils/units';
import ImageSetMarker from 'lion-guardians/models/image-set-marker';
import TagSearchMixin from 'lion-guardians/mixins/tag-search';
const reads = Ember.computed.reads;

export default Ember.Component.extend(TagSearchMixin, {
  genders: genders,
  isEditing: false,
  editingEnabled: false,
  imageSet: null,
  organizations: null,

  selectedDob: reads('imageSet.dateOfBirth'),
  selectedLatitude: reads('imageSet.latitude'),
  selectedLongitude: reads('imageSet.longitude'),
  selectedOrganization: reads('imageSet.organization'),
  selectedGender: reads('imageSet.gender'),
  selectedIsVerified: reads('imageSet.isVerified'),
  selectedDateStamp: reads('imageSet.dateStamp'),
  selectedNotes: reads('imageSet.notes'),

  setDefaultTag: function(property, category) {
    var tags = this.get('imageSet.tags');
    if (tags) {
      var selected = tags.find(function(tag) {
        return tag.indexOf(category) !== -1;
      });

      if (selected) {
        this.set(property, selected);
      }
    }
  },

  imageSetTagsObserver: function() {
    this.setDefaultTag('selectedEarMarking', 'EAR_MARKING');
    this.setDefaultTag('selectedEyeDamage',  'EYE_DAMAGE');
    this.setDefaultTag('selectedMouthMarkin', 'MOUTH_MARKING');
    this.setDefaultTag('selectedNoseColour', 'NOSE_COLOUR');
    this.setDefaultTag('selectedTailMarking', 'TAIL_MARKING');
    this.setDefaultTag('selectedTeeth', 'TEETH');
    this.setDefaultTag('selectedScar', 'SCARS');
  }.observes('imageSet.tags.[]').on('init'),

  mapMarker: function() {
    return ImageSetMarker.create({
      component: this
    });
  }.property(),

  resetValues: function() {
    var imageSet = this.get('imageSet');

    this.setProperties({
      selectedDob: imageSet.get('dateOfBirth'),
      selectedLatitude: imageSet.get('latitude'),
      selectedLongitude: imageSet.get('longitude'),
      selectedOrganization: imageSet.get('organization'),
      selectedGender: imageSet.get('gender'),
      selectedIsVerified: imageSet.get('isVerified')
    });
  },

  updateValues: function() {
    var imageSet = this.get('imageSet');

    imageSet.setProperties({
      dateOfBirth: this.get('selectedDob'),
      latitude: this.get('selectedLatitude'),
      longitude: this.get('selectedLongitude'),
      organization: this.get('selectedOrganization'),
      gender: this.get('selectedGender'),
      isVerified: this.get('selectedIsVerified'),
      tags: this.get('selectedTags'),
      dateStamp: this.get('selectedDateStamp'),
      notes: this.get('selectedNotes')
    });
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
      var currentOrg = this.get('imageSet.organization'),
          selectedOrg = this.get('selectedOrganization');

      if (currentOrg && currentOrg !== selectedOrg) {
        var curOrgName = Ember.get(currentOrg, 'name'),
            selectedOrgName = Ember.get(selectedOrg, 'name');

        var message = `You are about to change ownership of this image set from ${curOrgName} to ${selectedOrgName}.`;
        message += ' After changing, you will no longer have access to edit this image set. Are you sure?';

        if (confirm(message)) {
          // automatically set is Verified to false when changing organization
          this.set('selectedIsVerified', false);
          this.finishEditing();
        }
      } else {
        this.finishEditing();
      }
    }
  }
});
