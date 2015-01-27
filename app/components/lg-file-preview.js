import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['lg-file-preview'],

  width: 50,
  height: 50,

  previewQueue: null,

  file: null,
  isLoaded: false,

  computedStyle: function(){
    if (this.get('isLoaded')) {
      return 'display: block';
    } else {
      return 'display: none';
    }
  }.property('isLoaded'),

  loadImageFromFile: function(){
    var file = this.get('file');
    if (!file) { return; }

    var width  = this.get('width'),
        height = this.get('height');
    var component = this;

    var canvas = this.$('canvas')[0];
    var context = canvas.getContext('2d');

    this.get('previewQueue').addTask(function(){
      return new Ember.RSVP.Promise(function(resolve){
        var img = new Image();
        var imageURL = window.URL.createObjectURL(file);

        img.onload = function(){
          context.drawImage(img, 0, 0, width, height);
          Ember.run(component, 'set', 'isLoaded', true);
          window.URL.revokeObjectURL(imageURL);
          resolve();
        };

        img.src = imageURL;
      });
    });

  }.on('didInsertElement')
});
