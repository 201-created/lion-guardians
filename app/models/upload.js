import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  fields: DS.attr('raw'),

  uploadedBytes: 0,
  totalBytes: 0,

  // 0-1
  percentComplete: function(){
    var uploadedBytes = this.get('uploadedBytes'),
        totalBytes    = this.get('totalBytes');


    if (totalBytes === 0) { return 0; }

    return uploadedBytes / totalBytes;
  }.property('uploadedBytes', 'totalBytes')
});
