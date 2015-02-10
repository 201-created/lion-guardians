import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('image', 'Image', {
  needs: ['model:image-set', 'model:organization', 'model:user',
          'model:cv-result', 'model:lion', 'model:cv-request']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
