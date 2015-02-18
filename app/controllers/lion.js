import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  activeImageSet: null,

  isOwner: function() {
    return this.get('model.organization') === this.get('currentUser.organization');
  }.property('model.organization', 'currentUser.organization'),

  canEdit: function() {
    return this.get('activeImageSet') && this.get('isOwner');
  }.property('activeImageSet', 'isOwner')
});
