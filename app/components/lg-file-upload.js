import Ember from 'ember';

export default Ember.Component.extend({
  store: null,

  uploads: function(){ return Ember.A(); }.property(),

  uploadedBytes: 0,
  totalBytes: 0,

  percentComplete: function(){
    var uploadedBytes = this.get('uploadedBytes'),
        totalBytes    = this.get('totalBytes');


    if (totalBytes === 0) { return 0; }

    return parseInt( 100 * (uploadedBytes / totalBytes) );
  }.property('uploadedBytes', 'totalBytes'),

  setupFileUpload: function() {
    var store = this.get('store');
    var component = this;

    var fileInput = this.$('input[type="file"]');
    this.fileupload = fileInput.fileupload({
      fileInput: fileInput,
      type: 'POST',
      autoUpload: true,
      paramName: 'file',
      dataType: 'XML',
      replaceFileInput: false,

      progress: function(e,data){
        console.log('progress',e,data,data.files[0].name);
        var upload = data.uploadObj;
        Ember.run(function(){
          upload.set('uploadedBytes', data.loaded);
          upload.set('totalBytes', data.total);
          upload.set('bitRate', data.bitrate);
        });
      },

      progressall: function(e,data){
        console.log('progressall',e,data);
        Ember.run(function(){
          component.setProperties({
            uploadedBytes: data.loaded,
            totalBytes: data.total
          });
        });
      },

      add: function(e, data){
        var upload = store.createRecord('upload');
        upload.save().then(function(){
          data.formData = upload.get('fields');
          data.url = upload.get('url');

          data.uploadObj = upload;
          upload.setProperties({
            name: data.files[0].name,
            status: 'queued'
          });

          Ember.run(function(){
            component.get('uploads').pushObject(upload);
          });

          data.submit();
        });
      },

      submit: function(e, data){
        console.log('submit',e,data,data.files[0].name);
        var upload = data.uploadObj;
        Ember.run(upload, 'set', 'status', 'submitted');
      },

      send: function(e, data){
        console.log('send',e,data,data.files[0].name);
        var upload = data.uploadObj;
        Ember.run(upload, 'set', 'status', 'sent');
      },

      start: function(e, data){
        debugger;
      },

      fail: function(e, data){
        console.log('fail',e,data,data.files[0].name);
      },

      done: function(e, data){
        console.log('done',e,data,data.files[0].name);
        var upload = data.uploadObj;

        Ember.run(function(){
          upload.set('status', 'uploaded');
        });
      }
    });

  }.on('didInsertElement')
});
