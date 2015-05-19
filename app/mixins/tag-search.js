import Ember from 'ember';
import config from '../config/environment';
import ajax from '../utils/ajax';

export default Ember.Mixin.create({

  selectedEarMarking: null,
  earMarkingOptions: function() {
    return this._optionsForCategory('EAR_MARKING');
  }.property('allSearchOptions.[]', 'nullOption'),

  selectedEyeDamage: null,
  eyeDamageOptions: function() {
    return this._optionsForCategory('EYE_DAMAGE');
  }.property('allSearchOptions.[]', 'nullOption'),

  selectedMouthMarking: null,
  mouthMarkingOptions: function() {
    return this._optionsForCategory('MOUTH_MARKING');
  }.property('allSearchOptions.[]', 'nullOption'),

  selectedNoseColour: null,
  noseColourOptions: function() {
    return this._optionsForCategory('NOSE_COLOUR');
  }.property('allSearchOptions.[]', 'nullOption'),

  selectedTailMarking: null,
  tailMarkingOptions: function() {
    return this._optionsForCategory('TAIL_MARKING');
  }.property('allSearchOptions.[]', 'nullOption'),

  selectedTeeth: null,
  teethOptions: function() {
    return this._optionsForCategory('TEETH');
  }.property('allSearchOptions.[]', 'nullOption'),

  selectedScar: null,
  scarOptions: function() {
    return this._optionsForCategory('SCARS');
  }.property('allSearchOptions.[]', 'nullOption'),


  selectedTags: function() {
    var tags = [
      this.get('selectedEarMarking'),
      this.get('selectedEyeDamage'),
      this.get('selectedMouthMarking'),
      this.get('selectedNoseColour'),
      this.get('selectedTailMarking'),
      this.get('selectedTeeth'),
      this.get('selectedScar')
    ];

    var nullOption = this.get('nullOption');
    return tags.filter(function(s) {
      return !!s && s !== nullOption;
    });
  }.property('nullOption',
             'selectedEarMarking',
             'selectedEyeDamage',
             'selectedMouthMarking',
             'selectedNoseColour',
             'selectedTailMarking',
             'selectedTeeth',
             'selectedScar'),

  // PRIVATE METHODS AND PROPERTIES

  nullOption: '--',
  allSearchOptions: [],

  getSearchOptions: function() {
    var url = config.apiHost + '/search_options';
    var options = this.get('allSearchOptions');

    return ajax(url, {}).then(function(data) {
      var newOptions = data['search_options'];
      options.pushObjects(newOptions);
    });
  }.on('init'),

  _optionsForCategory: function(category) {
    var options = this.get('allSearchOptions'),
        nullOption = this.get('nullOption');

    var categoryOptions = options.filter(function(s) {
      return s.indexOf(category) !== -1;
    });

    return Ember.A([nullOption].concat(categoryOptions));
  }
});
