import Ember from 'ember';
import {imageTypes} from 'lion-guardians/utils/units';
import removeUnsavedImages from 'lion-guardians/utils/remove-unsaved-images';

const { reads, not, or } = Ember.computed;

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

  isOwner: function(){
    return this.get('currentUser.organization.id') ===
           this.get('model.organization.id');
  }.property('currentUser.organization.id', 'model.organization.id'),

  editingEnabled: or('isOwner', 'isCreatingNewLion', 'creatingNewImageSet'),

  creatingNewImageSet: not('model.id'),

  notCreatingNewImageSet: Ember.computed.not('creatingNewImageSet'),

  isCreatingNewLion: reads('createLion'),

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
      if (this.get('isCreatingNewLion')) {
        this._createNewLionWithImageSet().then((lion) => {
          return this.transitionToRoute('lion', lion);
        }).catch((e) => {
          alert('Error saving new lion with image set: ' + e.message);
        });
      } else {
        this._saveOrCreateImageSet().then((imageSet) => {
          this.transitionToRoute('image-set', imageSet);
        }).catch((e) => {
          alert('Error saving image set: ' + e.message);
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
    if (Ember.isBlank(lionName)) {
      return alert(`You must enter a lion name`);
    }
    const lion = this.get('store').createRecord('lion', {name: lionName});
    let imageSet;

    return this._saveOrCreateImageSet().then(function(_imageSet) {
      imageSet = _imageSet;

      lion.set('primaryImageSet', imageSet);
      return lion.save();
    });
  },

  _saveOrCreateImageSet: function(){
    const imageSet = this.get('model');

    return imageSet.save().then((imageSet) => {
      return removeUnsavedImages(imageSet);
    });
  }
});
