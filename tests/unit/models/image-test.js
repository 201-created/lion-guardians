import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('image', 'Image', {
  // Specify the other units that are required for this test.
  needs: ['model:image-set', 'model:organization']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
