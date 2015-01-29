import Ember from 'ember';
import {imageTypes, genders} from 'lion-guardians/utils/units';

var DEBUG = false;

export default Ember.Route.extend({
  imageTypes: imageTypes,
  defaultGender: genders[0],

  model: function(params) {
    if (DEBUG) {
      return this.createTestImageSet();
    }

    return this.store.find('imageSet', params.image_set_id);
  },

  createTestImageSet: function() {
    var imageTypes = this.get('imageTypes'),
        defaultGender = this.get('defaultGender');

    var image = this.store.createRecord('image', {
      url: 'https://lg-201-created-development.s3.amazonaws.com/uploads%2F69c38ec4-46e3-44b3-be50-c5e0581d2aa9%2F58yrs_male_Sikiria.jpg',
      imageType: imageTypes[0],
      isPublic: true
    });

    var imageSet = this.store.createRecord('image-set', {
      name: 'Isaac',
      age: '20',
      mainImage: image,
      gender: defaultGender
    });

    imageSet.get('images').pushObject(image);

    return imageSet;
  }
});
