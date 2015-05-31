import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['lg-lion-associator'],
  imageSet: null,
  lionId: null,
  showInput: false,

  lion: Ember.computed.reads('imageSet.lion'),

  isButtonActive: function(){
    return !this.get('lion') && this.get('imageSet');
  }.property('lion', 'imageSet'),

  actions: {
    showInput: function() {
      this.set('showInput', true);
    },

    hideInput: function() {
      this.set('showInput', false);
    },

    associateLion: function(imageSet, lionId) {
      const store = this.get('store');
      const component = this;
      this.set('isSaving', true);

      store.find('lion', lionId).then(function(lion) {
        imageSet.set('lion', lion);
        return imageSet.save();
      }).then(function(){
        component.set('showInput', false);
      }).catch(function(e) {
        if (e.status === 404) {
          return alert(`No lion found for ID ${lionId}. Lion not associated.`);
        }
      }).finally(function() {
        component.set('isSaving', false);
      });
    }
  }
});
