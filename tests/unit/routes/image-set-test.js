import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:image-set', 'ImageSetRoute', {
  needs: ['model:image-set', 'model:image']
});

test('it exists', function() {
  var route = this.subject();
  ok(route);
});
