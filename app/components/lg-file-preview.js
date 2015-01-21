import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['lg-file-preview'],

  file: null,
  status: null,

  isLoaded: false,
  src: null,

  loadImageFromFile: function(){
    var status = this.get('status');
    if (status !== 'uploaded') { return; }
    var file = this.get('file');
    if (!file) { return; }

    var imageURL = window.URL.createObjectURL(file);

    var canvas = this.$('canvas')[0];
    var context = canvas.getContext('2d');
    var img = new Image();

    img.onload = function(){
      context.drawImage(img, 0, 0, 50, 50);
    };

    img.src = imageURL;
  }.observes('status')
});
