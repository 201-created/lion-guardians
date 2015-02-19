var imageTypes = [
  'cv',
  'full-body',
  'whisker',
  'main-id',
  'markings'
];

var imageTypesForFilter = ['all'].concat(imageTypes);

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

var dobOptions = [
  {label: '0-3 years', value: 1.5},
  {label: '3-6 years', value: 4.5},
  {label: '6-9 years', value: 7.5},
  {label: '9-12 years', value: 10.5},
  {label: '12-15 years', value: 13.5},
  {label: '15-20 years', value: 17.5},
  {label: '20-25 years', value: 22.5},
  {label: '25+ years', value: 27.5}
];

var dobSearchOptions = [
  {label: 'All Ages', value: '0-0'},
  {label: '0-3 years', value: '0-4'},
  {label: '3-6 years', value: '2-7'},
  {label: '6-9 years', value: '5-10'},
  {label: '9-12 years',  value: '8-12'},
  {label: '12-15 years',  value: '11-16'},
  {label: '15-20 years',  value: '14-21'},
  {label: '20-25 years',  value: '19-26'},
  {label: '25+ years',  value: '24-100'}
];

export {imageTypes,
        imageTypesForFilter,
        genders,
        dobSearchOptions,
        searchGenders,
        defaultLocation,
        dobOptions};
