var imageTypes = [
  'cv',
  'full-body',
  'whisker',
  'main-id',
  'markings'
];

var genders = [
  'male',
  'female'
];

var searchGenders = ['all'].concat(genders);

// Maasai Mara National Reserve, Kenya
var defaultLocation = {
  latitude: -1.581981,
  longitude: 35.2451,
  zoom: 10,
  mapType: 'road'
};

export {imageTypes, genders, searchGenders, defaultLocation};
