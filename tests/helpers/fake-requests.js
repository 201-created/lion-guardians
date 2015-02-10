import { stubRequest } from '../helpers/fake-server';

function stubGetLions() {
  stubRequest('get', '/lions', function(request){
    return this.success({
      _embedded: {
        lions: [
          {
            id: 2,
            name: "Simba",
            primary_image_set_id: 24,
            _embedded: {
              image_sets: [
                {
                  id: 24,
                  is_verified: false,
                  latitude: null,
                  longitude: null,
                  gender: "male",
                  age: "24",
                  main_image_id: 49,
                  user_id: 1,
                  _embedded: {
                    images: [
                      {
                        id: 49,
                        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==", // red dot
                        image_type: "full-body",
                        is_public: true
                      }
                    ],
                    uploading_organization: {
                      id: 1,
                      name: "Lion Guardians"
                    }
                  }
                }
              ],
              organization: {
                id: 1,
                name: "Lion Guardians"
              }
            }
          }
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
          {
            id: 24,
            is_verified: false,
            latitude: null,
            longitude: null,
            gender: "male",
            age: "24",
            main_image_id: 49,
            user_id: 1,
            _embedded: {
              images: [
                {
                  id: 49,
                  url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==", // red dot
                  image_type: "full-body",
                  is_public: true
                }
              ],
              uploading_organization: {
                id: 1,
                name: "Lion Guardians"
              }
            }
          }
        ]
      }
    });
  });
}

function stubDeleteImageSets() {
  stubRequest('delete', '/imageSets', function(request){
    return this.success({
      _embedded: {}
    });
  });
}

export {
  stubGetLions,
  stubGetOrganizations,
  stubGetImageSets,
  stubDeleteImageSets
};
