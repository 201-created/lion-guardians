import Ember from 'ember';
import {genders} from 'lion-guardians/utils/units';

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

      var imageSet = this.get('imageSet');
      if (imageSet.get('id')) {
        imageSet.save();
      }
    }
  }
});
