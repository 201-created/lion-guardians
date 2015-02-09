import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('lion', 'Lion', {
  // Specify the other units that are required for this test.
  needs: ['model:image-set', 'model:organization', 'model:image', 'model:user']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
