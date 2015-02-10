import DS from 'ember-data';

export default DS.Model.extend({
  image: DS.belongsTo('image'),
  imageSet: DS.belongsTo('image-set'),
  lion: DS.belongsTo('lion'),
  matchProbability: DS.attr('number'),

  percent: function() {
    return this.get('matchProbability') * 100;
  }.property('matchProbability')
});
