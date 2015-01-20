import Ember from 'ember';

export default Ember.Component.extend({
  setupFileUpload: function() {
    var url = '/';

    var fileInput = this.$('input[type="file"]');
    this.fileupload = fileInput.fileupload({
      fileInput: fileInput,
      url: url,
      type: 'POST',
      autoUpload: false,
      formData: {},
      paramName: 'file',
      dataType: 'XML',
      replaceFileInput: false
    });

    debugger;

    this.fileupload.on('done', function(e,data){
      console.log('done',e,data);
      debugger;
    });

    this.fileupload.on('fail', function(e, data) {
      console.log('fail',e,data);
      debugger;
    });

    this.fileupload.on('start', function(e,data){
      console.log('start',e,data);
      debugger;
    });

    debugger;
    window.XXX = this.fileupload;

  }.on('didInsertElement')
});
