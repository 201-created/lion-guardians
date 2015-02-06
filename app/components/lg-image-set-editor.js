import Ember from 'ember';
import {imageTypes, genders} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  genders: genders,
  isEditing: false,
  editingEnabled: false,
  imageSet: null,
  organizations: null,

  actions: {
    startEditing: function() {
      this.set('isEditing', true);
    },

    finishEditing: function() {
      this.set('isEditing', false);
    }
  }
});
