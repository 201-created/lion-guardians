import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['progress'],

  // 0-1
  percent: 0,

  // 0-100
  humanPercent: function(){
    return this.get('percent') * 100;
  }.property('percent'),

  computedStyle: function(){
    return "width: " + this.get('humanPercent') + '%';
  }.property('humanPercent')
});
