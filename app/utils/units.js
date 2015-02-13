var imageTypes = [
  'full-body',
  'whisker',
  'markings',
  'cv',
  'face'
];

var genders = [
  'male',
  'female'
];

var searchGenders = ['all'].concat(genders);

// Amboseli National Park, Kajiado, Kenya
var defaultLocation = {
  latitude: -2.6527,
  longitude: 37.26058,
  zoom: 10,
  mapType: 'road'
};

export {imageTypes, genders, searchGenders, defaultLocation};
