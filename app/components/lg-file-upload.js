import Ember from 'ember';

export default Ember.Component.extend({
  store: null,

  setupFileUpload: function() {
    var url = '/';
    var store = this.get('store');

    var fileInput = this.$('input[type="file"]');
    this.fileupload = fileInput.fileupload({
      fileInput: fileInput,
      type: 'POST',
      autoUpload: true,
      paramName: 'file',
      dataType: 'XML',
      replaceFileInput: false,

      add: function(e, data){
        debugger;
        var upload = store.createRecord('upload');
        upload.save().then(function(){
          data.formData = upload.get('fields');
          data.url = upload.get('url');

          data.submit();
        });
      },

      submit: function(e, data){
        console.log('submit',e,data);
        debugger;
      },

      send: function(e, data){
        console.log('send',e,data);
        debugger;
      },

      fail: function(e, data){
        console.log('fail',e,data);
        debugger;
      },

      done: function(e, data){
        console.log('done',e,data);
        debugger;
      }
    });

    window.XXX = this.fileupload;

  }.on('didInsertElement')
});
