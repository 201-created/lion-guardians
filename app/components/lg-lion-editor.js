import Ember from 'ember';
const { reads } = Ember.computed;

export default Ember.Component.extend({
  isEditing: false,
  organizations: null,
  lion: null,

  isSaving: reads('lion.isSaving'),
  selectedName: reads('lion.name'),
  selectedOrganization: reads('lion.organization'),

  imageSet: reads('lion.primaryImageSet'),

  mapMarker: function() {
    var imageSet = this.get('imageSet');
    if (imageSet) {
      return Ember.Object.create({
        isDraggable: false,
        hasInfoWindow: false,
        lat: imageSet.get('latitude'),
        lng: imageSet.get('longitude')
      });
    } else {
      return null;
    }
  }.property('imageSet.latitude', 'imageSet.longitude'),

  resetValues: function() {
    var lion = this.get('lion');
    this.setProperties({
      selectedName: lion.get('name'),
      selectedOrganization: lion.get('organization')
    });
  },

  updateValues: function() {
    var lion = this.get('lion');

    lion.setProperties({
      name: this.get('selectedName'),
      organization: this.get('selectedOrganization')
    });
  },

  finishEditing: function() {
    this.updateValues();
    const lion = this.get('lion');

    lion.save().then(() => {
      this.set('isEditing', false);
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
      const organization = this.get('lion.organization'),
            selectedOrganization = this.get('selectedOrganization');

      if (selectedOrganization !== organization) {
        let message = `You are about to change ownership of this lion from ` +
              `${organization.get('name')} to ${selectedOrganization.get('name')}` +
              `. After changing, you will no longer have access to edit this lion. Are you sure?`;

        if (confirm(message)) {
          // automatically set is Verified to false when changing organization
          this.set('lion.primaryImageSet.organization', selectedOrganization);
          this.set('selectedIsVerified', false);
          this.finishEditing();
        }
      } else {
        this.finishEditing();
      }
    }
  }
});
