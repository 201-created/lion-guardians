import Ember from 'ember';
import {imageTypes} from 'lion-guardians/utils/units';

export default Ember.Controller.extend({
  currentUser: null,
  imageTypes: imageTypes,
  uploadImageType: imageTypes[0],
  uploadIsPublic: false,
  organizations: null,

  // If creating a new lion from an imageSet,
  // this property will be set to the new lion record
  // used mainly for showing saving status and errors
  newLion: null,
  newCvRequest: null,

  isOwner: function() {
    return this.get('currentUser.organization') === this.get('model.organization');
  }.property('currentUser.organization', 'model.organization'),

  actions: {
    addImage: function(upload){
      var url = upload.get('url'),
          isPublic = this.get('uploadIsPublic'),
          imageType = this.get('uploadImageType'),
          model = this.get('model');

      model.addImage(url, isPublic, imageType);

      // delete upload so it disappears from upload window
      upload.deleteRecord();
    },

    saveImageSet: function() {
      var imageSet = this.get('model'),
          controller = this;
      imageSet.save().then(function(imageSet) {
        // Remove original images that don't have IDs.
        // The server will come back with new objects
        var images = imageSet.get('images');
        var nullImages = images.rejectBy('id');
        images.removeObjects(nullImages);

        controller.transitionToRoute('image-set', imageSet);
      });
    }
  }
});
