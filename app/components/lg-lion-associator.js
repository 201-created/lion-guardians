import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['lg-lion-associator'],
  classNameBindings: ['showHeader:row'],
  imageSet: null,
  lionName: null,
  showLionNameField: false,
  showHeader: false,

  actions: {
    toggleShowLionName: function() {
      this.toggleProperty('showLionNameField');
    },

    createLion: function(imageSet, lionName) {
      this.toggleProperty('showLionNameField');
      this.sendAction('createLion', imageSet, lionName);
    }
  }
});
