import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['lg-file-preview'],
  file: null,
  isLoaded: false,
  src: null,

  loadImageFromFile: function(){
    var file = this.get('file');
    if (!file) { return; }

    var component = this;

    var reader = new FileReader();

    reader.onload = function(e){
      var result = e.target.result;
      Ember.run(function(){
        component.set('isLoaded', true);
        component.set('src', result);
      });
    };

    reader.readAsDataURL(file);

  }.on('didInsertElement')
});
