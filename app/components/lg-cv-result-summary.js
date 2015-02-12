import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['lg-cv-result-summary'],
  cvResult: null,
  action: null,

  actions: {
    selectCvResult: function() {
      var cvResult = this.get('cvResult');
      this.sendAction('action', cvResult);
    }
  }
});
