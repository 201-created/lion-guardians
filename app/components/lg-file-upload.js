import Ember from 'ember';

export default Ember.Component.extend({
  store: null,

  uploads: function(){ return Ember.A(); }.property(),
  showProgress: Ember.computed.gt('uploads.length', 0),

  uploadedBytes: 0,
  totalBytes: 0,

  // 0-1
  percentComplete: function(){
    var uploadedBytes = this.get('uploadedBytes'),
        totalBytes    = this.get('totalBytes');

    if (totalBytes === 0) { return 0; }

    return uploadedBytes / totalBytes;
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

      // Individual upload progress, called multiple times
      progress: function(e,data){
        var upload = data.uploadObj;

        Ember.run(function(){
          upload.set('uploadedBytes', data.loaded);
          upload.set('totalBytes', data.total);
          upload.set('bitRate', data.bitrate);
        });
      },

      // Overall progress, called multiple times
      progressall: function(e,data){
        Ember.run(function(){
          component.setProperties({
            uploadedBytes: data.loaded,
            totalBytes: data.total
          });
        });
      },

      // Called once for every file added.
      // The submit of the upload is done asynchronously to allow
      // us to fetch S3 upload information.
      // The `data.submit` call is the one that actually starts the upload.
      add: function(e, data){
        var upload = store.createRecord('upload');

        upload.save().then(function(){
          data.formData = upload.get('fields');
          data.url = upload.get('url');

          data.uploadObj = upload;
          upload.setProperties({
            file: data.files[0],
            name: data.files[0].name,
            status: 'queued'
          });

          Ember.run(function(){
            component.get('uploads').pushObject(upload);
          });

          data.submit();
        }).catch(function(e){
          component.set('error', true);
          if (e.message) {
            component.set('errorMessage', e.message);
          }
        });
      },

      // This is called after add, on submit
      submit: Ember.K,

      // Called after submit
      send: Ember.K,

      // called once when all uploads start
      start: Ember.K,

      fail: function(e) {
        Ember.run(function(){
          component.set('error', true);
          component.set('errorMessage', e.message);
        });
      },

      done: function(e, data){
        var upload = data.uploadObj;

        // S3 returns some XML after an upload with the full URL in a Location tag.
        var url = data.result.getElementsByTagName('Location')[0].textContent;
        Ember.run(this, function(){
          upload.setProperties({
            status: 'uploaded',
            url: url
          });
          component.sendAction('action', upload);
        });
      }
    });

  }.on('didInsertElement')
});
