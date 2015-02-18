import { stubRequest } from '../helpers/fake-server';
import { defaultLocation } from 'lion-guardians/utils/units';

function stubLionJSON() {
  var imageSet = stubImageSetJSON();
  imageSet.lion_id = 2;

  return {
    id: 2,
    name: "Simba",
    primary_image_set_id: 24,
    _embedded: {
      image_sets: [
        imageSet
      ],
      organization: {
        id: 1,
        name: "Lion Guardians"
      }
    }
  };
}

function stubImageSetJSON() {
  return {
    id: 24,
    is_verified: false,
    latitude: defaultLocation.latitude,
    longitude: defaultLocation.longitude,
    gender: "male",
    age: "24",
    main_image_id: 49,
    user_id: 1,
    organization_id: 1,
    uploading_organization_id: 1,
    _embedded: {
      images: [
        {
          id: 49,
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==", // red dot
          image_type: "full-body",
          is_public: true
        }
      ]
    }
  };
}

function stubGetLions() {
  stubRequest('get', '/lions', function(request){
    return this.success({
      _embedded: {
        lions: [
          stubLionJSON()
        ]
      }
    });
  });
}

function stubGetOrganizations() {
  stubRequest('get', '/organizations', function(request){
    var json = JSON.parse(request.requestBody);

    return this.success({
      _embedded: {
        organizations: [
          {
            id: 1,
            name: "Lion Guardians"
          },
          {
            id: 2,
            name: "201 Created"
          }
        ]
      }
    });
  });
}

function stubGetImageSets() {
  stubRequest('get', '/imageSets', function(request){
    return this.success({
      _embedded: {
        image_sets: [
          stubImageSetJSON()
        ]
      }
    });
  });
}

function stubGetImageSetsWithCvResults() {
  stubRequest('get', '/imageSets', function(request){
    var json = stubImageSetJSON();
    json.hasCvResults = true;
    return this.success({
      _embedded: {
        image_sets: [
          json
        ]
      }
    });
  });
}

function stubGetImageSet() {
  stubRequest('get', 'imageSets/:image_set_id', function(request){
    var json = stubImageSetJSON();
    json.id = request.params.image_set_id;

    return this.success(json);
  });
 }

function stubCvResultJSON() {
  return {
    id: 1,
    match_probability: 0.5,
    image_id: 49,
    _embedded: {
      image_set_id: 24,
      lion: stubLionJSON()
    }
  };
}

function stubGetCvResults(imageSetId) {
  stubRequest('get', '/cvResults', function(request) {
    deepEqual(request.queryParams, {image_set_id: imageSetId});

    return this.success({
      _embedded: {
        cv_results: [
          stubCvResultJSON()
        ]
      }
    });
  });
}

function stubGetUser() {
  stubRequest('get', '/users/1', function(request){
    return this.success({
      id: '1',
      name: 'isaac',
      organization_id: 1
    });
  });
}

export {
  stubGetLions,
  stubLionJSON,
  stubGetOrganizations,
  stubGetImageSets,
  stubGetImageSet,
  stubGetImageSetsWithCvResults,
  stubImageSetJSON,
  stubGetCvResults,
  stubCvResultJSON,
  stubGetUser
};
