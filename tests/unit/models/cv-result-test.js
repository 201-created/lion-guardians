import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('cv-result', 'CvResult', {
  needs: ['model:image-set', 'model:image', 'model:lion',
          'model:user', 'model:organization', 'model:cv-request']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
