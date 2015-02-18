import Ember from 'ember';

export default Ember.Component.extend({
  model: null,
  activeModel: null,
  classNames: ['row'],
  classNameBindings: ["isActive:active"],

  isActive: function() {
    return this.get('model') === this.get('activeModel');
  }.property('model', 'activeModel'),

  actions: {
    selectModel: function() {
      var model = this.get('model');
      this.sendAction('action', model);
    }
  }
});
