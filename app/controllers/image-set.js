import Ember from 'ember';
import {imageTypes} from 'lion-guardians/utils/units';

export default Ember.Controller.extend({
  queryParams: ['createLion'],
  createLion: false,

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

  creatingNewImageSet: function() {
    return !this.get('model.id');
  }.property('model.id'),

  notCreatingNewImageSet: Ember.computed.not('creatingNewImageSet'),

  disableShowButton: function() {
    return this.get('model.images.length');
  }.property('model.images.length'),

  isCreatingNewLion: function(){
    return !!this.get('createLion');
  }.property('createLion'),

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
      const controller = this;

      if (this.get('isCreatingNewLion')) {
        this._createNewLionWithImageSet().then(function(lion){
          return controller.transitionToRoute('lion', lion);
        });
      } else {
        this._saveOrCreateImageSet().then(function(imageSet){
          controller.transitionToRoute('image-set', imageSet);
        });
      }
    }
  },

  _createNewLionWithImageSet: function(){
    // if we are creating a lion:
    //   * create lion record (unsaved)
    //   * create the image set
    //   * set lion's primaryImageSet to the image set
    //   * save the lion

    const lionName = this.get('lionName');
    const lion = this.get('store').createRecord('lion', {name: lionName});
    let imageSet;

    return this._saveOrCreateImageSet().then(function(_imageSet) {
      imageSet = _imageSet;

      lion.set('primaryImageSet', imageSet);
      return lion.save();
    });
  },

  _saveOrCreateImageSet: function(){
    var imageSet = this.get('model'),
        controller = this;

    return imageSet.save().then(function(imageSet) {
      imageSet = controller._removeEmptyImages(imageSet);
      return imageSet;
    });
  },

  // Remove original images that don't have IDs.
  // The server will come back with new objects
  _removeEmptyImages: function(imageSet){
    var images = imageSet.get('images');
    var nullImages = images.rejectBy('id');
    images.removeObjects(nullImages);
    return imageSet;
  }
});
