import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  activeImageSet: null,

  isOwner: function() {
    return this.get('model.organization.id') === this.get('currentUser.organization.id');
  }.property('model.organization.id', 'currentUser.organization.id'),

  canEdit: function() {
    return this.get('activeImageSet') && this.get('isOwner');
  }.property('activeImageSet', 'isOwner')
});
